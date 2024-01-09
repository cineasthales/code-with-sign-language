$(() =>
{
    const vscode = acquireVsCodeApi(),
        primaryColor = 'rgb(19, 123, 205)';

    let currentArray = 0,
        currentIndex = 0,
        currentExample = 0,
        numberOfDigits = 0,
        totalDuration = 0,
        currentSpeed = 1,
        sliderSize = 1,
        hasTotalDuration = false,
        stopped = false,
        autoRepeatToggle = false,
        tooltipToggle = true,
        notInfo = true,
        currentLanguage = '',
        allVideos = [];

    allVideos.push([]);

    function previousIndex() { return currentIndex === 0 ? 0 : currentIndex - 1; }

    function nextIndex() { return currentIndex === sliderSize - 1 ? currentIndex : currentIndex + 1; }

    function updateSlider(newSize)
    {
        sliderSize = newSize;
        $('#sliderContainer').slider('option', 'max', sliderSize - 1);
    }

    function play()
    {
        stopped = false;
        $('#playPauseIcon').removeClass('fa-circle-play');
        $('#playPauseIcon').addClass('fa-circle-pause');
        $('#' + (notInfo ? 'video_' : 'info_') + currentArray + '_' + currentIndex).trigger('play');
    }

    function pause()
    {
        $('#playPauseIcon').removeClass('fa-circle-pause');
        $('#playPauseIcon').addClass('fa-circle-play');
        $('#' + (notInfo ? 'video_' : 'info_') + currentArray + '_' + currentIndex).trigger('pause');
    }

    function changeCurrentVideo(newArray, newIndex, playNew)
    {
        if (currentArray !== newArray) {
            playNew = false;
            newIndex = 0;
            updateSlider(allVideos[newArray][newIndex].length);
        }

        let newVideo = allVideos[newArray][newIndex];
        let newSign = newVideo.token;
        let currentVideo = '#video_' + currentArray + '_' + currentIndex;

        $(currentVideo).hide();
        $(currentVideo)[0].load();

        currentArray = newArray;
        currentIndex = newIndex;
        currentVideo = '#video_' + currentArray + '_' + currentIndex;

        $(currentVideo).show();

        if (currentArray === 0)
        {
            $(currentVideo).prop('playbackRate', currentSpeed);
        }
        else
        {
            newSign = '(' + (currentIndex + 1) + '/' + sliderSize + '): ' + newSign;

            if (!newVideo.examples)
            {
                $('#examplesContainer').hide();
            }
            else
            {
                $('#examplesContainer').show();

                if (newVideo.examples.length === 1)
                {
                    $('#previousExample').hide();
                    $('#nextExample').hide();
                }
                else
                {
                    $('#previousExample').show();
                    $('#nextExample').show();
                }
            }
        }

        newVideo.info ? $('#info').show() : $('#info').hide();
        $('#currentSign').text(newSign);
        $('#sliderContainer').slider('value', currentIndex);

        playNew ? play() : pause();
    }

    function updateCurrentTime()
    {
        if (!hasTotalDuration)
        {
            for (let i = 0; i < sliderSize; i++)
            {
                totalDuration += $('#video_' + currentArray + '_' + i).prop('duration');
            }
            if (!isNaN(totalDuration))
            {
                totalDuration = Math.floor(totalDuration);
                numberOfDigits = totalDuration.toString().length;
                $('#totalDuration').text(totalDuration + 's');
                hasTotalDuration = true;
            }
            else
            {
                totalDuration = 0;
            }
        }

        let currentTime = $('#video_' + currentArray + '_' + currentIndex).prop('currentTime');
        for (let i = 0; i < currentIndex; i++)
        {
            currentTime += $('#video_' + currentArray + '_' + i).prop('duration');
        }
        if (!isNaN(currentTime))
        {
            $('#currentTime').text(Math.floor(currentTime).toString().padStart(numberOfDigits, '0')  + 's');
        }
    }
    setInterval(updateCurrentTime, 200);

    window.addEventListener('message', event =>
    {
        const data = event.data;
        switch (data.messageType) {
            case 'main': loadMainVideos(data.videos); break;
            case 'categories': loadCategoriesVideos(data.categories, data.newLanguage); break;
            case 'init': initializeWebview(data);
        }
    });

    function loadMainVideos(videos)
    {
        $('#mainVideosContainer').empty();

        allVideos[0] = [];
        updateSlider(videos.length);

        for (let i = 0; i < sliderSize; i++)
        {
            const file = videos[i].file;
            const info = videos[i].info;

            $('#mainVideosContainer').append(
                `<video id="video_0_${i}" type="video/mp4" muted
                    src="${file.scheme}://${file.authority}${file.path}">
                </video>`
            );
            allVideos[0].push(videos[i]);

            if (i > 0)
            {
                $('#video_0_' + i).hide();
            }

            if (info)
            {
                $('#mainVideosContainer').append(
                    `<video id="info_0_${i}" type="video/mp4" muted
                        src="${info.scheme}://${info.authority}${info.path}">
                    </video>`
                );
                $('#info_0_' + i).hide();
            }
            
            $('#video_0_' + i).on('ended', () => {
                if (i < sliderSize - 1)
                {
                    changeCurrentVideo(0, i + 1, true);
                }
                else if (autoRepeatToggle)
                {
                    changeCurrentVideo(0, 0, true);
                }
                else
                {
                    stopped = true;
                    pause();
                }
            });
        }

        changeCurrentVideo(0, 0, true);
    }

    function loadCategoriesVideos(categories, newLanguage)
    {
        if (currentLanguage !== newLanguage)
        {
            currentLanguage = newLanguage;

            $('#categoriesContainer').empty();
            $('#categoriesVideosContainer').empty();

            const numberOfCategories = categories.length;
            for (let i = 0; i < numberOfCategories; i++)
            {
                const categoryIndex = i + 1;
                const tooltipFile = categories[i].tooltip;

                $('#categoriesContainer').append(
                    `<button id="category_${categoryIndex}" title="${categories[i].title}"
                        class="button categoryButton infoToggle">
                            <i class="fa-solid fa-${categories[i].icon}"></i>
                    </button>`
                );
                $('#category_' + categoryIndex).tooltip({
                    content:
                        `<video type="video/mp4" muted autoplay loop
                            src="${tooltipFile.scheme}://${tooltipFile.authority}${tooltipFile.path}">
                        </video>`,
                    show: {delay:750},
                });
                !allVideos[categoryIndex] ? allVideos.push([]) : allVideos[categoryIndex] = [];

                const numberOfVideos = categories[i].videos.length;
                for (let j = 0; j < numberOfVideos; j++)
                {
                    const file = categories[i].videos[j].file,
                        info = categories[i].videos[j].info;

                    $('#categoriesVideosContainer').append(
                        `<video id="video_${categoryIndex}_${j}" type="video/mp4" muted
                            src="${file.scheme}://${file.authority}${file.path}">
                        </video>
                        <video id="info_${categoryIndex}_${j}" type="video/mp4" muted
                            src="${info.scheme}://${info.authority}${info.path}">
                        </video>`
                    );
                    allVideos[categoryIndex].push(categories[i].videos[j]);

                    if (j > 0 || categoryIndex > 1)
                    {
                        $('#video_' + categoryIndex + '_' + j).hide();
                    }
                    $('#info_' + categoryIndex + '_' + j).hide();
                }
            }
        }
        updateSlider(allVideos[1][0].length);

        changeCurrentVideo(1, 0, false);
    }

    function initializeWebview(data)
    {        
        const tooltips = data.tooltips;
        for (let tooltip of tooltips)
        {
            const file = tooltip.file;
            $('#' + tooltip.id).tooltip({
                content:
                    `<video type="video/mp4" muted autoplay loop
                        src="${file.scheme}://${file.authority}${file.path}">
                    </video>`,
                show: {delay:750},
            });
        }

        $('#tabCodeToSign').on('click', () =>
        {
            $('#tabSignToCode').css('background-color', 'transparent');
            $('#tabCodeToSign').css('background-color', primaryColor);
            $('.signToCodeToggle').hide();
            $('.codeToSignToggle').show();
            changeCurrentVideo(0, 0, false);
        });
        $('#tabSignToCode').on('click', () =>
        {
            vscode.postMessage({ type: 'getCategories', currentLanguage: currentLanguage});
            $('#tabCodeToSign').css('background-color', 'transparent');
            $('#tabSignToCode').css('background-color', primaryColor);
            $('.codeToSignToggle').hide();
            $('.signToCodeToggle').show();
        });

        $('.categoryButton').on('click', (event) =>
        {
            const newArray = event.target.id;
            $('.categoryButton').css('background-color', 'transparent');
            $('#category_' + newArray).css('background-color', primaryColor);
            changeCurrentVideo(newArray, 0, false);
        });

        $('#slower').on('click', () =>
        {
            if (currentSpeed > 0.25)
            {
                currentSpeed -= 0.25;
                $('#video_0_' + currentIndex).prop('playbackRate', currentSpeed);
                $('#currentSpeed').text(currentSpeed + 'x');
            }
        });
        $('#faster').on('click', () =>
        {
            if (currentSpeed < 2)
            {
                currentSpeed += 0.25;
                $('#video_0_' + currentIndex).prop('playbackRate', currentSpeed);
                $('#currentSpeed').text(currentSpeed + 'x');;
            }
        });

        $('#sliderContainer').slider(
        {
            animate: 'fast',
            max: sliderSize - 1,
            start: (event, ui) =>
            {
                if (ui.value !== currentIndex)
                {
                    pause();
                }
            },
            stop: (event, ui) =>
            {
                if (ui.value !== currentIndex)
                {
                    changeCurrentVideo(currentArray, ui.value, false);
                }
            }
        }).slider('pips', { first: 'pip', last: 'pip' });

        $('#rewind').on('click', () =>
        {
            changeCurrentVideo(0, 0, false);
        });
        $('#backward').on('click', () =>
        {
            changeCurrentVideo(0, previousIndex(), false);
        });
        $('#previousInCategory').on('click', () =>
        {
            changeCurrentVideo(currentArray, previousIndex(), false);
        });

        $('#playPause').on('click', () =>
        {
            if ($('#playPauseIcon').hasClass('fa-circle-play'))
            {
                if (stopped)
                {
                    $('#rewind').trigger('click');
                }
                play();
            } else {
                pause();
            }
        });

        $('#nextInCategory').on('click', () =>
        {
            changeCurrentVideo(currentArray, nextIndex(), false);
        });
        $('#forward').on('click', () =>
        {
            changeCurrentVideo(0, nextIndex(), false);
        });
        $('#autoRepeatToggle').on('click', () =>
        {
            autoRepeatToggle = !autoRepeatToggle;
            $('#autoRepeatToggle').css('background-color', autoRepeatToggle ? primaryColor : 'transparent');
        });

        $('#info').on('click', () =>
        {
            if ($('#infoIcon').hasClass('fa-question'))
            {
                $('#infoIcon').removeClass('fa-question');
                $('#infoIcon').addClass('fa-check');
                $('#info').prop('title', 'Ok');
                $('.infoTimeToggle').css('opacity', '0.1');
                $('.infoToggle').css('opacity', '0.1');
                $('.infoToggle').css('cursor', 'not-allowed');
                $('.infoToggle').prop('disabled', true);
                $('#sliderContainer').slider('disable');
                const sufix = currentArray + '_' + currentIndex;
                $('#video_' + sufix).hide();
                $('#video_' + sufix)[0].load();
                $('#info_' + sufix).show();
                notInfo = false;
                play();
            }
            else
            {
                $('#infoIcon').removeClass('fa-check');
                $('#infoIcon').addClass('fa-question');
                $('#info').prop('title', 'O que isto significa?');
                $('.infoTimeToggle').css('opacity', '1');
                $('.infoToggle').css('opacity', '1');
                $('.infoToggle').css('cursor', 'pointer');
                $('.infoToggle').prop('disabled', false);
                $('#sliderContainer').slider('enable');
                notInfo = true;
                changeCurrentVideo(currentArray, currentIndex, false);
            }
        });

        $('#tooltipToggle').on('click', () =>
        {
            tooltipToggle = !tooltipToggle;
            $('#tooltipToggle').css('background-color', tooltipToggle ? primaryColor : 'transparent');
            $('.button').tooltip(tooltipToggle ? 'enable' : 'disable');
        });

        $('#readCode').on('click', () =>
        {
            hasTotalDuration = false;
            totalDuration = 0;
            $('#totalDuration').text('');
            $('#currentTime').text('');
            vscode.postMessage({ type: 'readCode' });
        });
        $('#writeCode').on('click', () =>
        {
            vscode.postMessage({
                type: 'writeCode',
                text: allVideos[currentArray][currentIndex].examples[currentExample],
            });
        });

        $('#previousExample').on('click', () =>
        {
            const examples = allVideos[currentArray][currentIndex].examples;
            const newExample = currentExample === 0 ? 0 : currentExample - 1;
            $('#exampleBlock').text(examples[newExample]);
        });
        $('#nextExample').on('click', () =>
        {
            const examples = allVideos[currentArray][currentIndex].examples;
            const newExample = currentExample === examples.length - 1 ? currentExample : currentExample + 1;
            $('#exampleBlock').text(examples[newExample]);
        });

        $('body').on('keypress', event =>
        {
            if (event.keyCode === 32)
            {
                $('#playPause').trigger('click');
            }
        });
        $('body').on('keydown', event =>
        {
            switch (event.key)
            {
                case 'i':
                case 'I':
                    $('#info').trigger('click'); break;
                case 't':
                case 'T':
                    $('#tooltipToggle').trigger('click');
            }
            
            if (currentArray === 0)
            {
                switch (event.key)
                {
                    case 'PageDown':
                        $('#slower').trigger('click'); break;
                    case 'PageUp':
                        $('#faster').trigger('click'); break;
                    case 'Home':
                    case 'End':
                    case 'Backspace':
                        $('#rewind').trigger('click'); break;
                    case 'ArrowLeft':
                        $('#backward').trigger('click'); break;
                    case 'ArrowRight':
                        $('#forward').trigger('click'); break;
                    case 'a':
                    case 'A':
                        $('#autoRepeatToggle').trigger('click'); break;
                    case 'r':
                    case 'R':
                        $('#readCode').trigger('click');
                }
            }
            else
            {
                switch (event.key)
                {
                    case 'ArrowLeft':
                        $('#previousInCategory').trigger('click'); break;
                    case 'ArrowRight':
                        $('#nextInCategory').trigger('click'); break;
                    case 'PageDown':
                        $('#previousExample').trigger('click'); break;
                    case 'PageUp':
                        $('#nextExample').trigger('click'); break;
                    case 'w':
                    case 'W':
                        $('#writeCode').trigger('click');
                }
            }
        });

        $('.signToCodeToggle').hide();

        loadMainVideos(data.videos);
    }
});
