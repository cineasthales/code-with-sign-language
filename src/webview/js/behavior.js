$(() =>
{
    const vscode = acquireVsCodeApi();
    const primaryColor = 'rgb(19, 123, 205)';

    let currentArray = 0, currentIndex = 0, currentSpeed = 1;
    let numberOfDigits = 0, totalDuration = 0, sliderSize = 1;
    let hasTotalDuration = false, stopped = false;
    let tooltipToggle = true, autoRepeatToggle = true;
    let currentLanguage = '';
    let allVideos = [];
    allVideos.push([]);

    function previousIndex() { return currentIndex === 0 ? 0 : currentIndex - 1; }

    function nextIndex() { return currentIndex === sliderSize - 1 ? currentIndex : currentIndex + 1; }

    function reloadSlider()
    {
        if ($('#sliderContainer').slider('instance'))
        {
            $('#sliderContainer').slider('destroy');
        }
        if (sliderSize > 1)
        {
            $('#sliderContainer').slider(
            {
                animate: 'fast',
                max: sliderSize - 1,
                start: (event, ui) =>
                {
                    if (ui.value !== currentIndex) { pause(); }
                },
                stop: (event, ui) =>
                {
                    if (ui.value !== currentIndex) { changeCurrentVideo(currentArray, ui.value, false); }
                }
            }).slider('pips', { first: 'pip', last: 'pip' });
        }
    }

    function play()
    {
        stopped = false;
        $('#playPauseIcon').removeClass('fa-circle-play');
        $('#playPauseIcon').addClass('fa-circle-pause');
        $('#playPauseIcon').prop('title', 'Pausar vídeo');
        $('#video_' + currentArray + '_' + currentIndex).trigger('play');
    }

    function pause()
    {
        $('#playPauseIcon').removeClass('fa-circle-pause');
        $('#playPauseIcon').addClass('fa-circle-play');
        $('#playPauseIcon').prop('title', 'Reproduzir vídeo');
        $('#video_' + currentArray + '_' + currentIndex).trigger('pause');
    }

    function changeCurrentVideo(newArray, newIndex, playNew)
    {
        if (currentArray !== newArray || sliderSize > 1)
        {
            if (currentArray !== newArray) {
                reloadSlider();
            } else if ($('#sliderContainer').slider('instance')) {
                $('#sliderContainer').slider('value', newIndex);
            }
            let currentVideo = '#video_' + currentArray + '_' + currentIndex;
            $(currentVideo).hide();
            $(currentVideo)[0].load();
            currentArray = newArray;
            currentIndex = newIndex;
            currentVideo = '#video_' + currentArray + '_' + currentIndex;
            $(currentVideo).show();
            $('#currentSign').text(allVideos[currentArray][currentIndex].token);
            if (currentArray === 0)
            {
                $(currentVideo).prop('playbackRate', currentSpeed);
            }
        }
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
        sliderSize = videos.length;

        for (let i = 0; i < sliderSize; i++)
        {
            const file = videos[i].file;
            $('#mainVideosContainer').append(
                `<video id="video_0_${i}" type="video/mp4" muted
                    src="${file.scheme}://${file.authority}${file.path}">
                </video>`
            );
            allVideos[0].push(videos[i]);

            if (i > 0) { $('#video_0_' + i).hide(); }

            $('#video_0_' + i).on('ended', () => {
                if (i < allVideos[0].length - 1) {
                    changeCurrentVideo(0, i + 1, true);
                } else if (autoRepeatToggle) {
                    changeCurrentVideo(0, 0, true);
                } else {
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
                        class="button categoryButton">
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
                allVideos[categoryIndex] === 'undefined' ? allVideos.push([]) : allVideos[categoryIndex] = [];

                const numberOfVideos = categories[i].videos.length;
                for (let j = 0; j < numberOfVideos; j++)
                {
                    const file = categories[i].videos[j].file;
                    $('#categoriesVideosContainer').append(
                        `<video id="video_${categoryIndex}_${j}" type="video/mp4" muted
                            src="${file.scheme}://${file.authority}${file.path}">
                        </video>`
                    );
                    allVideos[categoryIndex].push(categories[i].videos[j]);

                    if (j > 0 || categoryIndex > 1)
                    {
                        $('#video_' + categoryIndex + '_' + j).hide();
                    }
                }
            }
        }
        sliderSize = allVideos[1].videos.length;

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
        
        $('#tooltipToggle').on('click', () =>
        {
            tooltipToggle = !tooltipToggle;
            $('#tooltipToggle').css('background-color', tooltipToggle ? primaryColor : 'transparent');
            $('.button').tooltip(tooltipToggle ? 'enable' : 'disable');
        });

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
                if (stopped) { $('#rewind').trigger('click'); }
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
            pause();
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
            }
        });

        $('#readCode').on('click', () =>
        {
            hasTotalDuration = false;
            totalDuration = 0;
            vscode.postMessage({ type: 'readCode' });
        });
        $('#writeCode').on('click', () =>
        {
            vscode.postMessage({ type: 'writeCode', text: 'teste' });
        });

        $('body').on('keypress', event =>
        {
            if (event.keyCode === 32) { $('#playPause').trigger('click'); }
        });
        $('body').on('keydown', event =>
        {
            if (event.key === 'i' || event.key === 'I')
            {
                $('#info').trigger('click');
            }
            else if (currentArray === 0)
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
