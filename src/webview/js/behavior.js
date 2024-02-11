$(() =>
{
    const vscode = acquireVsCodeApi(),
        primaryColor = 'rgb(19, 123, 205)';

    let currentArray = 0,
        currentIndex = 0,
        numberOfDigits = 0,
        totalDuration = 0,
        currentSpeed = 1,
        videosGroupSize = 1,
        hasTotalDuration = false,
        stopped = false,
        autoRepeatToggle = false,
        showCodeToSignTab = true,
        tooltipToggle = true,
        notInfo = true,
        allVideos = [],
        timeInterval;

    allVideos.push([]);

    /* VS CODE MESSAGE HANDLING */

    window.addEventListener('message', event =>
    {
        const data = event.data;
        switch (data.messageType) {
            case 'error': loadErrorVideo(data.error[0].file); break;
            case 'codeToSign': loadCodeToSignVideos(data.videos); break;
            case 'categories': loadCategoriesVideos(data.categories); break;
            case 'tooltips': loadTooltipsVideos(data.tooltips);
        }
    });

    function loadErrorVideo(file)
    {
        $('#initialVideo').empty();
        $('#initialVideo').append(
            `<video type='video/mp4' muted autoplay
                src='${file.scheme}://${file.authority}${file.path}'>
            </video>`
        );
        $('#loadingTab').hide();
        $('#initialTab').show();
    }

    function loadCodeToSignVideos(videos)
    {
        $('#codeToSignVideos').empty();

        allVideos[0] = [];
        updateSlider(0, videos.length);

        for (let i = 0; i < videosGroupSize; i++)
        {
            const file = videos[i].file;
            const info = videos[i].info;

            $('#codeToSignVideos').append(
                `<video id='video_0_${i}' type='video/mp4' muted
                    src='${file.scheme}://${file.authority}${file.path}'>
                </video>`
            );
            allVideos[0].push(videos[i]);

            if (i > 0)
            {
                $('#video_0_' + i).hide();
            }

            if (info)
            {
                $('#codeToSignVideos').append(
                    `<video id='info_0_${i}' type='video/mp4' muted
                        src='${info.scheme}://${info.authority}${info.path}'>
                    </video>`
                ); 
                $('#info_0_' + i).hide();
            }
            
            $('#video_0_' + i).on('ended', () => {
                if (i < videosGroupSize - 1)
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

            $('#info_0_' + i).on('ended', () => { pause(); });
        }

        timeInterval = setInterval(updateCurrentTime, 200);

        changeCurrentVideo(0, 0, false);
    }

    function loadCategoriesVideos(categories)
    {
        $('#signToCodeCategories').empty();
        $('#signToCodeVideos').empty();

        const numberOfCategories = categories.length;
        for (let i = 0; i < numberOfCategories; i++)
        {
            const categoryIndex = i + 1;
            const categoryTooltip = categories[i].tooltip;

            $('#signToCodeCategories').append(
                `<button id='category_${categoryIndex}' title='${categories[i].title}'
                    class='button categoryButton infoToggle'>
                        <i class='fa-solid fa-${categories[i].icon}'></i>
                </button>`
            );

            $('#category_' + categoryIndex).on('click', () =>
            {
                $('.categoryButton').css('background-color', 'transparent');
                $('#category_' + categoryIndex).css('background-color', primaryColor);
                changeCurrentVideo(categoryIndex, 0, false);
            });

            $('#category_' + categoryIndex).tooltip({
                content:
                    `<video type='video/mp4' muted autoplay loop
                        src='${categoryTooltip.scheme}://${categoryTooltip.authority}${categoryTooltip.path}'>
                    </video>`,
                show: {delay:750},
            });

            !allVideos[categoryIndex] ? allVideos.push([]) : allVideos[categoryIndex] = [];

            const numberOfVideos = categories[i].videos.length;
            for (let j = 0; j < numberOfVideos; j++)
            {
                const file = categories[i].videos[j].file;
                const info = categories[i].videos[j].info;

                $('#signToCodeVideos').append(
                    `<video id='video_${categoryIndex}_${j}' type='video/mp4' muted
                        src='${file.scheme}://${file.authority}${file.path}'>
                    </video>
                    <video id='info_${categoryIndex}_${j}' type='video/mp4' muted
                        src='${info.scheme}://${info.authority}${info.path}'>
                    </video>`
                );
                allVideos[categoryIndex].push(categories[i].videos[j]);

                if (j > 0 || categoryIndex > 1)
                {
                    $('#video_' + categoryIndex + '_' + j).hide();
                }
                $('#info_' + categoryIndex + '_' + j).hide();

                $('#video_' + categoryIndex + '_' + j).on('ended', () => { pause(); });
                $('#info_' + categoryIndex + '_' + j).on('ended', () => { pause(); });
            }
        }

        changeCurrentVideo(1, 0, false);

        $('#loadingTab').hide();
        $('#signToCodeTab').show();
    }

    function loadTooltipsVideos(tooltips)
    {
        for (let tooltip of tooltips)
        {
            const file = tooltip.file;
            $('#' + tooltip.id).tooltip({
                content:
                    `<video type='video/mp4' muted autoplay loop
                        src='${file.scheme}://${file.authority}${file.path}'>
                    </video>`,
                show: {delay:750},
            });
        }
    }

    /* INITIAL TAB */

    $('#goToCodeToSign').on('click', () =>
    {
        $('#initialTab').hide();
        $('#loadingTab').css('display', 'flex');
        vscode.postMessage({ type: 'codeToSign' });
    });

    $('#goToSignToCode').on('click', () =>
    {
        $('#initialTab').hide();
        $('#loadingTab').css('display', 'flex');
        vscode.postMessage({ type: 'categories' });
    });

    /* CODE TO SIGN TAB */

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

    $('#codeToSignSlider, #signToCodeSlider').slider(
    {
        animate: 'fast',
        max: videosGroupSize - 1,
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

    $('#codeToSignPlayPause, #signToCodePlayPause').on('click', () =>
    {
        if ($('.playPauseIcon').hasClass('fa-circle-play'))
        {
            if (currentArray === 0 && stopped)
            {
                $('#rewind').trigger('click');
            }
            play();
        } else {
            pause();
        }
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

    $('#codeToSignTooltipToggle, #signToCodeTooltipToggle').on('click', () =>
    {
        tooltipToggle = !tooltipToggle;
        if (tooltipToggle)
        {
            $('.button').tooltip('enable');
            $('#codeToSignTooltipToggle').css('background-color', primaryColor);
            $('#signToCodeTooltipToggle').css('background-color', primaryColor);
        }
        else
        {
            $('.button').tooltip('disable');
            $('#codeToSignTooltipToggle').css('background-color', 'transparent');
            $('#signToCodeTooltipToggle').css('background-color', 'transparent');
        }
    });

    $('#codeToSignInfo, #signToCodeInfo').on('click', () =>
    {
        const sufix = currentArray + '_' + currentIndex;
        if ($('.infoIcon').hasClass('fa-question'))
        {
            $('.infoIcon').removeClass('fa-question');
            $('.infoIcon').addClass('fa-check');
            $('.infoTimeToggle').css('opacity', '0.1');
            $('.infoToggle').css('opacity', '0.1');
            $('.infoToggle').css('cursor', 'not-allowed');
            $('.infoToggle').prop('disabled', true);
            $(!currentArray ? '#codeToSignSlider' : '#signToCodeSlider').slider('disable');
            $('#video_' + sufix).hide();
            $('#video_' + sufix)[0].load();
            $('#info_' + sufix).show();
            notInfo = false;
            play();
        }
        else
        {
            pause();
            $('.infoIcon').removeClass('fa-check');
            $('.infoIcon').addClass('fa-question');
            $('.infoTimeToggle').css('opacity', '1');
            $('.infoToggle').css('opacity', '1');
            $('.infoToggle').css('cursor', 'pointer');
            $('.infoToggle').prop('disabled', false);
            $(!currentArray ? '#codeToSignSlider' : '#signToCodeSlider').slider('enable');
            $('#info_' + sufix).hide();
            $('#info_' + sufix)[0].load();
            notInfo = true;
            changeCurrentVideo(currentArray, currentIndex, false);
        }
    });

    $('#codeToSignAgain').on('click', () =>
    {
        clearInterval(timeInterval);
        hasTotalDuration = false;
        showCodeToSignTab = true;
        totalDuration = 0;
        $('#codeToSignTab').hide();
        $('#loadingTab').css('display', 'flex');
        vscode.postMessage({ type: 'codeToSign' });
    });

    /* SIGN TO CODE TAB */

    $('#previousInCategory').on('click', () =>
    {
        changeCurrentVideo(currentArray, previousIndex(), false);
    });

    $('#nextInCategory').on('click', () =>
    {
        changeCurrentVideo(currentArray, nextIndex(), false);
    });

    $('#writeExampleToCode').on('click', () =>
    {
        vscode.postMessage({
            type: 'signToCode',
            text: allVideos[currentArray][currentIndex].example,
        });
    });

    /* OTHER NAMED FUNCTIONS */

    function previousIndex() { return currentIndex === 0 ? 0 : currentIndex - 1; }

    function nextIndex() { return currentIndex === videosGroupSize - 1 ? currentIndex : currentIndex + 1; }

    function updateSlider(array, newSize)
    {
        videosGroupSize = newSize;
        $('#' + (array ? 'signToCode' : 'codeToSign') + 'Slider').slider('option', 'max', videosGroupSize - 1);
    }

    function play()
    {
        stopped = false;
        $('.playPauseIcon').removeClass('fa-circle-play');
        $('.playPauseIcon').addClass('fa-circle-pause');
        $('#' + (notInfo ? 'video_' : 'info_') + currentArray + '_' + currentIndex).trigger('play');
    }

    function pause()
    {
        $('.playPauseIcon').removeClass('fa-circle-pause');
        $('.playPauseIcon').addClass('fa-circle-play');
        $('#' + (notInfo ? 'video_' : 'info_') + currentArray + '_' + currentIndex).trigger('pause');
    }

    function changeCurrentVideo(newArray, newIndex, playNew)
    {
        const newVideo = allVideos[newArray][newIndex];
        const newToken = newVideo.token;
        let currentVideo = '#video_' + currentArray + '_' + currentIndex;

        $(currentVideo).hide();

        if (currentArray !== newArray) {
            playNew = false;
            newIndex = 0;
            updateSlider(newArray, allVideos[newArray].length);
        } else {
            $(currentVideo)[0].load();
        }

        currentArray = newArray;
        currentIndex = newIndex;
        currentVideo = '#video_' + currentArray + '_' + currentIndex;

        $(currentVideo).show();

        if (currentArray === 0)
        {
            $(currentVideo).prop('playbackRate', currentSpeed);
            $('#codeToSignSlider').slider('value', currentIndex);
            $('#codeToSignCurrentToken').text(newToken);

            newVideo.info ? $('#codeToSignInfo').show() : $('#codeToSignInfo').hide();
        }
        else
        {
            $('#signToCodeSlider').slider('value', currentIndex);
            $('#signToCodeCurrentToken').text(newToken);
            $('#signToCodePagination').text((currentIndex + 1) + '/' + videosGroupSize);

            if (newVideo.example)
            {
                const exampleToShow = newVideo.example
                    .replaceAll('\n', '<br>')
                    .replaceAll('\t', '&nbsp;&nbsp;&nbsp;&nbsp;');
                $('#codeContainer').html(exampleToShow);
                $('#signToCodeExample').css('display', 'flex');
            }
            else
            {
                $('#codeContainer').empty();
                $('#signToCodeExample').hide();
            }

            newVideo.info ? $('#signToCodeInfo').show() : $('#signToCodeInfo').hide();
        }

        playNew ? play() : pause();
    }

    function updateCurrentTime()
    {
        if (!hasTotalDuration)
        {
            for (let i = 0; i < videosGroupSize; i++)
            {
                totalDuration += $('#video_0_' + i).prop('duration');
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
        else
        {
            let currentTime = $('#video_0_' + currentIndex).prop('currentTime');
            for (let i = 0; i < currentIndex; i++)
            {
                currentTime += $('#video_0_' + i).prop('duration');
            }

            if (!isNaN(currentTime))
            {
                $('#currentTime').text(Math.floor(currentTime).toString().padStart(numberOfDigits, '0')  + 's');
                if (showCodeToSignTab)
                {
                    $('#loadingTab').hide();
                    $('#codeToSignTab').show();
                    showCodeToSignTab = false;
                }
            }
        }
    }

    /* KEYBOARD SHORTCUTS

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
    */
});