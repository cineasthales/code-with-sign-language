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
        if ($('#sliderContainer').slider('instance')) {
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
            $('#mainVideosContainer').append(
                '<video id="video_0_' + i + '" type="video/mp4" muted src="'
                + videos[i].file.scheme + '://' + videos[i].file.authority
                + videos[i].file.path + '"></video>',
            );
            allVideos[0].push(videos[i]);
        }

        reloadSlider();
    }

    function loadCategoriesVideos(categories, newLanguage)
    {
        if (currentLanguage !== newLanguage)
        {
            currentLanguage = newLanguage;
            
            $('#categoriesVideosContainer').empty();
    
            const numberOfCategories = categories.length;
            for (let i = 0; i < numberOfCategories; i++)
            {
                const numberOfVideosInCategory = categories[i].videos.length;
                if (i = 0)
                {
                    sliderSize = numberOfVideosInCategory;
                    reloadSlider();
                }
                const categoryIndex = i + 1;
                allVideos[categoryIndex] === 'undefined' ? allVideos.push([]) : allVideos[categoryIndex] = [];
                for (let j = 0; j < numberOfVideosInCategory; j++)
                {
                    $('#categoriesVideosContainer').append(
                        '<video id="video_' + categoryIndex + '_' + j + '" type="video/mp4" muted src="'
                        + categories[i].videos[j].file.scheme + '://' + categories[i].videos[j].file.authority
                        + categories[i].videos[j].file.path + '"></video>',
                    );
                    allVideos[categoryIndex].push(categories[i].videos[j]);
                }
            }
        }
        else
        {
            currentArray = 1;
            sliderSize = allVideos[currentArray].videos.length;
            reloadSlider();
        }
    }

    function initializeWebview(data)
    {        
        const tooltips = data.tooltips;
        for (tooltip of tooltips)
        {
            $('#' + tooltip.id).tooltip({
                content: '<video type="video/mp4" muted autoplay loop src="' + tooltip.file.scheme
                + '://' + tooltip.file.authority + tooltip.file.path + '"></video>',
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
            vscode.postMessage({ type: 'getCategories', currentLanguage: currentLanguage});
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
            hasTotalDuration = false;
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
                        $('#autoRepeat').trigger('click'); break;
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
