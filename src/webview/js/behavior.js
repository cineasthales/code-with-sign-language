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
    
    $('#goToCodeToSign').on('click', () =>
    {
        $('#welcomeTab').hide();
        $('#loadingTab').show();
        // segundos depois
        //$('#loadingTab').hide();
        $('#codeToSignTab').show();
    });

    $('#goToSignToCode').on('click', () =>
    {
        $('#welcomeTab').hide();
        $('#loadingTab').show();
        // segundos depois
        //$('#loadingTab').hide();
        $('#signToCodeTab').show();
    });
});