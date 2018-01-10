export default helpers = {

        handleResult(label, res) {
            console.log("res...");
            console.log(res);
            if (res && res.OK === 1) {
                console.log(`Success: ${label}`);
            } else if (res) {
                console.log(`Failure: ${label}`);
            } else {
                console.log(label);
            }
        },

        getProps(obj) {
            t = {};
            Reflect.ownKeys(obj).forEach(k => {
                Reflect.set(t, k, obj[k]);
            })
            return t;
        },

        seconds2Time(seconds) {
            if (!seconds || typeof seconds !== 'number') {
                seconds = (new Date()).getSeconds() / 1000;
            }

            let hours = Math.floor(seconds / 3600);
            let minutes = Math.floor((seconds - (hours * 3600)) / 60);
            seconds = seconds - (hours * 3600) - (minutes * 60);
            let time = "";
            time = hours.toFixed(0) + ":" + minutes.toFixed(0) + ":" + seconds.toFixed(0);
            return time;
        },

        milliSeconds2Hours(millis) {
            if (!millis || typeof millis !== 'number') return 0;
            let seconds = millis / 1000;
            let hours = seconds / 3600;
            return hours.toFixed(1);
        },

        getDateFromString(dateStr) {
            if (typeof dateStr !== "string") return new Date();
            let dash = '-';
            let fslash = '/';
            let sep = '';
            let year = 0;
            let month = 0;
            let day = 0;
            let retval = null;

            if (dateStr.indexOf(dash) > 0) sep = dash;
            if (dateStr.indexOf(fslash) > 0) sep = fslash;

            let idx = dateStr.indexOf(sep);
            if (idx > 0) {
                year = dateStr.substr(0, idx);
                year = Number.parseInt(year);
                //console.log("YEAR=%d", year);
                month = dateStr.substr(idx + 1, 2);
                month = Number.parseInt(month);
                //console.log("MONTH=%d", month);
                idx = dateStr.indexOf(sep, idx + 1);
                if (idx > 0) {
                    day = dateStr.substr(idx + 1, 2);
                    day = Number.parseInt(day);
                    //console.log("DAY=%d", day);
                }
                retval = new Date(year, month - 1, day);
            }
            //console.log("getDateFromString: year=%d; month=%d; day=%d and latest value of idx=%d", year, month, day, idx);

            return retval;
        },

        getDateString(arg) {
            if (typeof arg === "string") return arg; //early return
            let date = arg || new Date();
            if (typeof arg === "number") {
                date = new Date(arg);
            }
            let sep = '-';
            let dateStr = "";
            dateStr = date.getFullYear() + sep;
            if (date.getMonth() < 9) dateStr += "0";
            dateStr += (date.getMonth() + 1) + sep;
            if (date.getDate() < 10) dateStr += "0";
            dateStr += date.getDate();
            return dateStr;
        },

        showDayOfWeek() {
            dowArray = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday");
            today = new Date();
            dow = today.getDay();
            return dowArray[dow];
        }

    } //end helpers