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
        showCodeToSignTab = true,
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
        $('#codeToSignSlider').slider('option', 'max', sliderSize - 1);
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
        let newToken = newVideo.token;
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
            $('#codeToSignSlider').slider('value', currentIndex);
        }

        newVideo.info ? $('#info').show() : $('#info').hide();
        $('#currentToken').text(newToken);

        playNew ? play() : pause();
    }

    function updateCurrentTime()
    {
        if (!hasTotalDuration)
        {
            for (let i = 0; i < sliderSize; i++)
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
                if (showCodeToSignTab) {
                    $('#loadingTab').hide();
                    $('#codeToSignTab').show();
                    showCodeToSignTab = false;
                }
            }
        }
    }
    setInterval(updateCurrentTime, 200);

    window.addEventListener('message', event =>
    {
        const data = event.data;
        switch (data.messageType) {
            case 'error': loadErrorVideo(data.videos[0].file); break;
            case 'codeToSign': loadCodeToSignVideos(data.videos);
        }
    });

    function loadErrorVideo(file)
    {
        $('#initialVideo').empty();
        $('#initialVideo').append(
            `<video type="video/mp4" muted autoplay
                src="${file.scheme}://${file.authority}${file.path}">
            </video>`
        );
        $('#loadingTab').hide();
        $('#initialTab').show();
    }

    function loadCodeToSignVideos(videos)
    {
        $('#codeToSignVideos').empty();

        allVideos[0] = [];
        updateSlider(videos.length);
        $('#debug').text('');

        for (let i = 0; i < sliderSize; i++)
        {
            const file = videos[i].file;
            const info = videos[i].info;

            $('#codeToSignVideos').append(
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
                $('#codeToSignVideos').append(
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

        changeCurrentVideo(0, 0, false);
    }

    $('#goToCodeToSign').on('click', () =>
    {
        $('#initialTab').hide();
        $('#loadingTab').css('display', 'flex');
        vscode.postMessage({ type: 'codeToSign' });
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

    $('#codeToSignSlider').slider(
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

    $('#forward').on('click', () =>
    {
        changeCurrentVideo(0, nextIndex(), false);
    });
    $('#autoRepeatToggle').on('click', () =>
    {
        autoRepeatToggle = !autoRepeatToggle;
        $('#autoRepeatToggle').css('background-color', autoRepeatToggle ? primaryColor : 'transparent');
    });

    $('#tooltipToggle').on('click', () =>
    {
        tooltipToggle = !tooltipToggle;
        $('#tooltipToggle').css('background-color', tooltipToggle ? primaryColor : 'transparent');
        //$('.button').tooltip(tooltipToggle ? 'enable' : 'disable');
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
            $('#codeToSignSlider').slider('disable');
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
            $('#codeToSignSlider').slider('enable');
            notInfo = true;
            changeCurrentVideo(currentArray, currentIndex, false);
        }
    });

    $('#updateCodeToSign').on('click', () =>
    {
        hasTotalDuration = false;
        showCodeToSignTab = true;
        totalDuration = 0;
        $('#codeToSignTab').hide();
        $('#loadingTab').css('display', 'flex');
        vscode.postMessage({ type: 'codeToSign' });
    });
});