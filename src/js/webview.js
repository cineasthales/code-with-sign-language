$(() => {
    window.addEventListener('message', event => {
        
        const videos = event.data.videos;

        let currentIndex = 0, totalDuration = 0, numberOfDigits = 0;
        let autoRepeat = true, stopped = false, hasTotalDuration = false;

        for (let i = 0; i < videos.length; i++) {
            $('#videoContainer').append(
                '<video width="550" height="270" type="video/mp4" muted '
                + 'id="video_' + i + '" src="' + videos[i].file.scheme
                + '://' + videos[i].file.authority
                + videos[i].file.path + '"></video>'
            );

            if (i > 0) {
                $('#video_' + i).hide();
            } else {
                $('#currentSign').text(videos[0].sign);
            }

            $('#video_' + i).on('ended', () => {
                if (i < videos.length - 1) {
                    changeCurrentVideo(i + 1, true);
                } else if (autoRepeat) {
                    changeCurrentVideo(0, true);
                } else {
                    stopped = true;
                    pause();
                }
            });
        }

        $('#rewind').on('click', () => {
            changeCurrentVideo(0, false);
        });

        $('#backward').on('click', () => {
            let newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
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
            let newIndex = currentIndex === videos.length - 1 ? currentIndex : currentIndex + 1;
            changeCurrentVideo(newIndex, false);
        });

        $('#autoRepeat').on('click', () => {
            autoRepeat = !autoRepeat;
            $('#autoRepeatIcon').css('color', autoRepeat ? 'green' : 'white');
        });

        function play() {
            stopped = false;
            $('#playPauseIcon').removeClass('fa-circle-play');
            $('#playPauseIcon').addClass('fa-circle-pause');
            $('#video_' + currentIndex).trigger('play');
        }

        function pause() {
            $('#playPauseIcon').removeClass('fa-circle-pause');
            $('#playPauseIcon').addClass('fa-circle-play');
            $('#video_' + currentIndex).trigger('pause');
        }

        function changeCurrentVideo(newIndex, playNew) {
            $('#video_' + currentIndex).hide();
            $('#video_' + currentIndex)[0].load();
            currentIndex = newIndex;
            $('#video_' + currentIndex).show();
            $('#currentSign').text(videos[currentIndex].sign);
            playNew ? play() : pause();
        }

        function updateCurrentTime() {
            if (!hasTotalDuration) {
                for (let i = 0; i < videos.length; i++) {
                    totalDuration += $('#video_' + i).prop('duration');
                }
                totalDuration = Math.floor(totalDuration);
                numberOfDigits = totalDuration.toString().length;
                $('#totalDuration').text(totalDuration + 's');
                $('#infoContainer').css('color', 'white');
                hasTotalDuration = true;
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

    });
});