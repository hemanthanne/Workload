const startWorkload = async (backend) => {
    console.log("startWorkload:" + backend);
    if (backend == "WEBGL") {
        tf.setBackend("webgl");
    } else if (backend == "CPU") {
        tf.setBackend("cpu");
    } else if (backend == "WASM") {
        tf.setBackend("wasm");
    }
    // await tf.ready().then(console.log("TF is ready"));
    console.log("Version:");
    console.log(tf.version.tfjs);
    console.log("Backend:");
    selectedBackend = tf.getBackend();
};

document.getElementById('queSubmit')
    .addEventListener('click', (e) => {

        var backend = document.getElementById("backend").value;
        console.log("backend:" + backend);
        startWorkload(backend);

        const imgcount = 48;
        let getCurrentTime = () => {
            if ("performance" in window == true) {
                return performance.now();
            }
            return new Data().getTime();
        }

        let startTime = 0;
        let endTime = 0;
        const imgPrediction = async () => {
            const prediction = await mobilenet.load();
            let imageValue = [];
            startTime = getCurrentTime();
            for (let i = 0; i < imgcount; i++) {
                let img = document.getElementById('img' + i);
                let imgsize = await prediction.classify(img);
                imageValue.push(imgsize);
            }

            imgtxt(imageValue);
            endTime = getCurrentTime();
        }
        let imgtxt = (imageValue) => {
            let value = [];
            imageValue.map(element => {
                console.log(element, 'element');
                const finalvalue = element.reduce((prev, current) => (+prev.probability > +current.probability) ? prev : current);
                value.push(finalvalue);
            });

            let i = 0;
            value.forEach((index, i) => {
                let elList = document.getElementById('imgval' + i);
                elList.innerHTML = index.className;
            })
        }

        const durationTime = async () => {
            await imgPrediction();
            const duration = (endTime - startTime);
            console.log('duration', Math.round(duration));
            document.getElementById('durationTime').innerHTML = 'Total Duration = ' + Math.round(duration).toString() + ' ms';
            return duration;
            console.log(tf.getBackend());
        }
        durationTime();

    });