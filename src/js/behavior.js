$(() => {

    const vscode = acquireVsCodeApi();
    const primaryColor = 'rgb(19, 123, 205)';
    let currentTab = 1;

    $('.signToCodeToggle').hide();

    $('#tabCodeToSign').on('click', () => {
        $('#tabSignToCode').css('background-color', 'transparent');
        $('#tabCodeToSign').css('background-color', primaryColor);
        $('.signToCodeToggle').hide();
        $('.codeToSignToggle').show();
        currentTab = 1;
    });

    $('#tabSignToCode').on('click', () => {
        $('#tabCodeToSign').css('background-color', 'transparent');
        $('#tabSignToCode').css('background-color', primaryColor);
        $('.codeToSignToggle').hide();
        $('.signToCodeToggle').show();
        currentTab = 2;
    });

    // $('.categories').on('click', () => {
    //     $('.categories').css('background-color', 'transparent');
    //     $(this).css('background-color', primaryColor);
    //     //$(this).css('cssText', 'background-color: ' + primaryColor + ' !important;');
    //     changeCurrentVideo
    // });

    window.addEventListener('message', event => {

        const tooltips = event.data.tooltips;
        const videos = event.data.videos;
        const numberOfVideos = videos.length;
        let currentIndex = 0, currentCategory = 0;
        let totalDuration = 0, numberOfDigits = 0, currentSpeed = 1;
        let autoRepeat = true, stopped = false, hasTotalDuration = false;

        for (let i = 0; i < numberOfVideos; i++) {
            $('#videoContainer').append(
                '<video type="video/mp4" muted '
                + 'id="video_' + i + '" src="' + videos[i].file.scheme
                + '://' + videos[i].file.authority
                + videos[i].file.path + '"></video>'
            );

            i > 0 ? $('#video_' + i).hide() : $('#currentSign').text(videos[0].sign.toUpperCase());

            $('#video_' + i).on('ended', () => {
                if (i < numberOfVideos - 1) {
                    changeCurrentVideo(i + 1, true);
                } else if (autoRepeat) {
                    changeCurrentVideo(0, true);
                } else {
                    stopped = true;
                    pause();
                }
            });
        }

        $('#slower').on('click', () => {
            if (currentSpeed > 0.25) {
                currentSpeed -= 0.25;
                $('#video_' + currentIndex).prop('playbackRate', currentSpeed);
                $('#currentSpeed').text(currentSpeed + 'x');
            }
        });
        $('#faster').on('click', () => {
            if (currentSpeed < 2) {
                currentSpeed += 0.25;
                $('#video_' + currentIndex).prop('playbackRate', currentSpeed);
                $('#currentSpeed').text(currentSpeed + 'x');
            }
        });

        $('#sliderContainer').slider({
            animate: 'fast',
            max: numberOfVideos - 1,
            start: (event, ui) => {
                if (ui.value !== currentIndex) {
                    pause();
                }
            },
            stop: (event, ui) => {
                if (ui.value !== currentIndex) {
                    changeCurrentVideo(ui.value, false);
                }
            }
        }).slider('pips', { first: 'pip', last: 'pip' });

        $('#rewind').on('click', () => {
            changeCurrentVideo(0, false);
        });
        $('#backward').on('click', () => {
            const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
            changeCurrentVideo(newIndex, false);
        });
        $('#playPause').on('click', () => {
            if ($('#playPauseIcon').hasClass('fa-circle-play')) {
                if (stopped) {
                    $('#rewind').trigger('click');
                }
                play();
            } else {
                pause();
            }
        });
        $('#forward').on('click', () => {
            const newIndex = currentIndex === numberOfVideos - 1 ? currentIndex : currentIndex + 1;
            changeCurrentVideo(newIndex, false);
        });
        $('#autoRepeat').on('click', () => {
            autoRepeat = !autoRepeat;
            $('#autoRepeat').css('background-color', autoRepeat ? primaryColor : 'transparent');
        });

        $('#info').on('click', () => {
            pause();
            if ($('#infoIcon').hasClass('fa-question')) {
                $('#infoIcon').removeClass('fa-question');
                $('#infoIcon').addClass('fa-check');
                $('#info').prop('title', 'Ok');
                $('.infoTimeToggle').css('opacity', '0.1');
                $('.infoToggle').css('opacity', '0.1');
                $('.infoToggle').css('cursor', 'not-allowed');
                $('.infoToggle').prop('disabled', true);
                $('#sliderContainer').slider('disable');
            } else {
                $('#infoIcon').removeClass('fa-check');
                $('#infoIcon').addClass('fa-question');
                $('#info').prop('title', 'O que é esta palavra?');
                $('.infoTimeToggle').css('opacity', '1');
                $('.infoToggle').css('opacity', '1');
                $('.infoToggle').css('cursor', 'pointer');
                $('.infoToggle').prop('disabled', false);
                $('#sliderContainer').slider('enable');
            }
        });

        $('#readCode').on('click', () => {
            vscode.postMessage({ type: 'read' });
        });
        $('#writeCode').on('click', () => {
            vscode.postMessage({ type: 'write', text: videos[currentIndex].sign });
        });

        $('body').on('keypress', event => {
            if (event.keyCode === 32) {
                $('#playPause').trigger('click');
            }
        });
        $('body').on('keydown', event => {
            if (event.key === 'i' || event.key === 'I') {
                $('#info').trigger('click');
            } else if (currentTab === 1) {
                switch (event.key) {
                    case 'PageDown':
                        $('#slower').trigger('click');
                        break;
                    case 'PageUp':
                        $('#faster').trigger('click');
                        break;
                    case 'Home':
                    case 'End':
                    case 'Backspace':
                        $('#rewind').trigger('click');
                        break;
                    case 'ArrowLeft':
                        $('#backward').trigger('click');
                        break;
                    case 'ArrowRight':
                        $('#forward').trigger('click');
                        break;
                    case 'a':
                    case 'A':
                        $('#autoRepeat').trigger('click');
                        break;
                    case 'r':
                    case 'R':
                        $('#readCode').trigger('click');
                }
            } else if (currentTab === 2) {
                switch (event.key) {
                    case 'ArrowLeft':
                        $('#previousInCategory').trigger('click');
                        break;
                    case 'ArrowRight':
                        $('#nextInCategory').trigger('click');
                        break;
                    case 'w':
                    case 'W':
                        $('#writeCode').trigger('click');
                }
            }
        });

        function play() {
            stopped = false;
            $('#playPauseIcon').removeClass('fa-circle-play');
            $('#playPauseIcon').addClass('fa-circle-pause');
            $('#playPauseIcon').prop('title', 'Pausar vídeo');
            $('#video_' + currentIndex).trigger('play');
        }

        function pause() {
            $('#playPauseIcon').removeClass('fa-circle-pause');
            $('#playPauseIcon').addClass('fa-circle-play');
            $('#playPauseIcon').prop('title', 'Reproduzir vídeo');
            $('#video_' + currentIndex).trigger('pause');
        }

        function changeCurrentVideo(newIndex, playNew) {
            if (numberOfVideos > 1) {
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

        function updateCurrentTime() {
            if (!hasTotalDuration) {
                for (let i = 0; i < numberOfVideos; i++) {
                    totalDuration += $('#video_' + i).prop('duration');
                }
                if (!isNaN(totalDuration)) {
                    totalDuration = Math.floor(totalDuration);
                    numberOfDigits = totalDuration.toString().length;
                    $('#totalDuration').text(totalDuration + 's');
                    hasTotalDuration = true;
                } else {
                    totalDuration = 0;
                }
            }

            let currentTime = $('#video_' + currentIndex).prop('currentTime');
            for (let i = 0; i < currentIndex; i++) {
                currentTime += $('#video_' + i).prop('duration');
            }
            if (!isNaN(currentTime)) {
                $('#currentTime').text(Math.floor(currentTime).toString().padStart(numberOfDigits, '0')  + 's');
            }
        }
        setInterval(updateCurrentTime, 200);

        const componentsIds = [
            'tabCodeToSign', 'tabSignToCode', 'slower', 'faster', 'rewind', 'backward', 'previousInCategory',
            'playPause', 'nextInCategory', 'forward', 'autoRepeat', 'info', 'readCode', 'writeCode',
        ];
        const numberOfComponents = componentsIds.length;

        for (let i = 0; i < numberOfComponents; i++) {
            $('#' + componentsIds[i]).tooltip({
                content: '<video type="video/mp4" muted autoplay loop src="' + tooltips[i].file.scheme
                + '://' + tooltips[i].file.authority + tooltips[i].file.path + '"></video>',
                show: {delay:1000},
            });
        }
    });

});


