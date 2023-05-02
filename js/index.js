$(document).ready(function () {
    const minutesElement = $("#minutes"), secendElement = $("#secend");

    $($("#btn-one")).click(function () {
        minutesElement.text("25");
        secendElement.text("00");
    });
    $($("#btn-two")).click(function () {
        minutesElement.text("05");
        secendElement.text("00");
    });
    $($("#btn-three")).click(function () {
        minutesElement.text("10");
        secendElement.text("00");
    });

    $($("#btn-start")).click(function () {
        let minutesCal = minutesElement.text() - 1;
        let minutesLength = (' ' + minutesCal).length - 1;
        
        if (minutesLength == 1) {
            minutesCal = "0" + minutesCal;
        }
        setInterval(function () {
            minutesElement.text(minutesCal);
        }, 1000)

        setInterval(function () {
            minutesCal--;
            if (minutesLength == 1) {
                minutesCal = "0" + minutesCal;
            }
            minutesElement.text(minutesCal);
        }, 61000);

        let secendCal = 60;
        setInterval(function () {
            secendCal--;
            let secendLength = (' ' + secendCal).length - 1;
            if (secendCal == -1) {
                secendCal = 59;
            }
            if (secendLength == 1) {
                secendCal = "0" + secendCal;
            }
            secendElement.text(secendCal);
        }, 1000);
        if (minutesCal == 0 || secendCal == 0) {
            alert("tamom");
            minutesCal == 00
            secendCal == 00;
        }
    })
});