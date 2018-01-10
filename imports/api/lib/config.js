export default appConfig = {
    hoursPerDay: 8.0,
    hourlyRate: 60.0,
    alerts: {
        position: 'top-left',
        effect: 'slide',
        onShow: function () {
            //console.log('Alert: onChange')
        },
        beep: true,
        timeout: 4000,
        offset: 200
    }
}

