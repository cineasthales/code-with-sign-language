$(() =>
{
    const vscode = acquireVsCodeApi();
    const primaryColor = 'rgb(19, 123, 205)';

    let currentArray = 0, currentIndex = 0, currentSpeed = 1;
    let numberOfDigits = 0, totalDuration = 0, sliderSize = 1;
    let hasTotalDuration = false, stopped = false;
    let tooltipToggle = true, autoRepeatToggle = true;

    $('.signToCodeToggle').hide();

    window.addEventListener('message', event =>
    {
        const data = event.data;
        switch (data.messageType) {
            case 'main': loadMainVideos(data); break;
            case 'categories': loadCategoriesVideos(data); break;
            case 'init': initializeView(data);
        }
    });

    function loadMainVideos(data)
    {
        $('#mainVideosContainer').empty();

        sliderSize = data.length;
        for (let i = 0; i < sliderSize; i++)
        {
            $('#mainVideosContainer').append(
                '<video id="video_0_' + i + '" type="video/mp4" muted src="'
                + data[i].scheme + '://' + data[i].authority + data[i].path + '"></video>',
            );
        }

        reloadSlider();
    }

    function loadCategoriesVideos(data)
    {
        $('#categoriesVideosContainer').empty();

        const numberOfCategories = data.length;
        for (let i = 0; i < numberOfCategories; i++)
        {
            const numberOfVideosInCategory = data[i].length;
            if (i = 0)
            {
                sliderSize = numberOfVideosInCategory;
                reloadSlider();
            }
            for (let j = 0; j < numberOfVideosInCategory; j++)
            {
                $('#categoriesVideosContainer').append(
                    '<video id="video_' + i + '_' + j + '" type="video/mp4" muted src="'
                    + data[i][j].scheme + '://' + data[i][j].authority + data[i][j].path + '"></video>',
                );
            }
        }
    }

    function reloadSlider()
    {
        $('#sliderContainer').slider('destroy');
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

    function previousIndex()
    {
        return currentIndex === 0 ? 0 : currentIndex - 1;
    }

    function nextIndex()
    {
        return currentIndex === sliderSize - 1 ? currentIndex : currentIndex + 1;
    }

    function initializeView(data)
    {
        loadMainVideos(data.welcome);
        
        const tooltips = data.tooltips;
        const tooltipsIds = data.tooltipsIds;
        const numberOfTooltips = tooltipsIds.length;
        
        for (let i = 0; i < numberOfTooltips; i++)
        {
            $('#' + tooltipsIds[i]).tooltip({
                content: '<video type="video/mp4" muted autoplay loop src="' + tooltips[i].scheme
                + '://' + tooltips[i].authority + tooltips[i].path + '"></video>',
                show: {delay:750},
            });
        }
        $('#tooltipToggle').on('click', () =>
        {
            tooltipToggle = !tooltipToggle;
            $('#tooltipToggle').css('background-color', tooltipToggle ? primaryColor : 'transparent');
            $(button).tooltip(tooltipToggle ? 'enable' : 'disable');
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
            $('#tabCodeToSign').css('background-color', 'transparent');
            $('#tabSignToCode').css('background-color', primaryColor);
            $('.codeToSignToggle').hide();
            $('.signToCodeToggle').show();
            changeCurrentVideo(1, 0, false);
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
            const newIndex = 
            changeCurrentVideo(currentArray, nextIndex(), false);
        });
        $('#forward').on('click', () =>
        {
            changeCurrentVideo(0, nextIndex(), false);
        });
        $('#autoRepeat').on('click', () =>
        {
            autoRepeatToggle = !autoRepeatToggle;
            $('#autoRepeat').css('background-color', autoRepeatToggle ? primaryColor : 'transparent');
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
            vscode.postMessage({ type: 'readCode' });
        });
        $('#writeCode').on('click', () =>
        {
            vscode.postMessage({ type: 'writeCode', text: 'teste' });
        });

        // REFACTOR FROM HERE!!!

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
            else if (currentTab === 1)
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
                        $('#autoRepeat').trigger('click'); break;
                    case 'r':
                    case 'R':
                        $('#readCode').trigger('click');
                }
            }
            /*
            else if (currentTab === 2)
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
            */
        });

        function play()
        {
            stopped = false;
            $('#playPauseIcon').removeClass('fa-circle-play');
            $('#playPauseIcon').addClass('fa-circle-pause');
            $('#playPauseIcon').prop('title', 'Pausar vídeo');
            $('#video_' + currentIndex).trigger('play');
        }

        function pause()
        {
            $('#playPauseIcon').removeClass('fa-circle-pause');
            $('#playPauseIcon').addClass('fa-circle-play');
            $('#playPauseIcon').prop('title', 'Reproduzir vídeo');
            $('#video_' + currentIndex).trigger('pause');
        }

        function changeCurrentVideo(newIndex, playNew)
        {
            if (numberOfVideos > 1)
            {
                $('#video_' + currentIndex).hide();
                $('#video_' + currentIndex)[0].load();
                currentIndex = newIndex;
                $('#video_' + currentIndex).show();
                $('#video_' + currentIndex).prop('playbackRate', currentSpeed);
                $('#sliderContainer').slider('value', currentIndex);
                $('#currentSign').text(videos[currentIndex].sign.toUpperCase());
            }
            playNew ? play() : pause();
        }

        function updateCurrentTime()
        {
            if (!hasTotalDuration)
            {
                for (let i = 0; i < numberOfVideos; i++)
                {
                    totalDuration += $('#video_' + i).prop('duration');
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

            let currentTime = $('#video_' + currentIndex).prop('currentTime');
            for (let i = 0; i < currentIndex; i++)
            {
                currentTime += $('#video_' + i).prop('duration');
            }
            if (!isNaN(currentTime))
            {
                $('#currentTime').text(Math.floor(currentTime).toString().padStart(numberOfDigits, '0')  + 's');
            }
        }
        setInterval(updateCurrentTime, 200);

        function loadTranslationVideos(data)
        {
            // TODO
        }
    }
});
