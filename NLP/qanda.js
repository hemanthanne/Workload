const questions = [
    "An igneous rock is a rock that crystallizes from what?",
    "When the three types of rock are re-melted what is formed?",
    "What are the three major types of rock?",
    "What changes the mineral content of a rock?",
    "Sedimentary rock can be turned into which of the three types of rock?"
];

const questions1 = [
    "What concept did philosophers in antiquity use to study simple machines?",
    "What was the belief that maintaining motion required force?",
    "How long did it take to improve on Sir Isaac Newton's laws of motion?",
    "Who develped the theory of relativity?",
    "Most of the previous understandings about motion and force were corrected by whom?"
];

const questions2 = [
    "What is the process of constructing a building or infrastructure?",
    "What typically involves mass production of similar items without a designated purchaser?",
    "What percentile of gross domestic product is construction comprised of?",
    "What three things are needed for construction to take place?",
    "Construction takes place on location for who?"
];

const predict = async () => {
    let questionCount = questions.length;
    let que = [];
    for (let i = 0; i < questionCount; i++) {
        que.push(`<label class="text-bold">Question ${i + 1}:</label> <span class="text-success" id="time${i + 1}"></span>
        <p><strong class="question">${questions[i]}</strong></p>
        <p type='text' id="qa${i + 1}"></p>`);
    }
    document.getElementById('questionList').innerHTML = que.join();

    let questionCount1 = questions1.length;
    let que1 = [];
    for (let i = 0; i < questionCount1; i++) {
        que1.push(`<label class="text-bold">Question ${i + 1}:</label> <span class="text-success" id="time1${i + 1}"></span>
        <p><strong class="question">${questions1[i]}</strong></p>
        <p type='text' id="qa1${i + 1}"></p>`);
    }
    document.getElementById('questionList1').innerHTML = que1.join();

    let questionCount2 = questions2.length;
    let que2 = [];
    for (let i = 0; i < questionCount2; i++) {
        que2.push(`<label class="text-bold">Question ${i + 1}:</label> <span class="text-success" id="time2${i + 1}"></span>
        <p><strong class="question">${questions2[i]}</strong></p>
        <p type='text' id="qa2${i + 1}"></p>`);
    }
    document.getElementById('questionList2').innerHTML = que2.join();

    model = await qna.load();

    const startWorkload = async (backend) => {
        console.log("startWorkload:" + backend);
        if (backend == "WEBGL") {
            tf.setBackend("webgl");
        } else if (backend == "CPU") {
            tf.setBackend("cpu");
        } else if (backend == "WASM") {
            tf.setBackend("wasm");
        }
        await tf.ready().then(console.log("TF is ready"));
        console.log("Version:");
        console.log(tf.version.tfjs);
        console.log("Backend:");
        selectedBackend = tf.getBackend();
    };

    document.getElementById("queSubmit").disabled = false;
    document.getElementById("queSubmit1").disabled = false;
    document.getElementById("queSubmit2").disabled = false;

    document.getElementById('queSubmit')
        .addEventListener('click', (e) => {
            var backend = document.getElementById("backend").value;
            console.log("backend:" + backend);
            startWorkload(backend);
            let startArr = [];
            let total = 0;
            const passage = document.getElementById('passage').innerHTML;
            let startTime = new Date().getTime();
            for (let i = 0; i < questionCount; i++) {
                let index = i;
                startArr.push(index > 0 ? new Date().getTime() : startTime);
                model.findAnswers(questions[i], passage).then((answers) => {
                    let endTime = new Date().getTime();
                    total = endTime - startTime;
                    newStart = endTime - startArr[index];
                    console.log(total, newStart);
                    document.getElementById(`qa${index + 1}`).innerHTML = answers[0]?.text;
                    console.log('Answers :', answers);
                    document.getElementById(`time${index + 1}`).innerHTML = `Time Taken: ${newStart}ms`;
                    document.getElementById('totalTime').innerHTML = `Time Taken: ${total}ms`;
                });
            }

            e.preventDefault();
        });

    document.getElementById('queSubmit1')
        .addEventListener('click', (e) => {
            var backend = document.getElementById("backend").value;
            console.log("backend:" + backend);
            startWorkload(backend);
            let startArr = [];
            let total1 = 0;
            const passage1 = document.getElementById('passage1').innerHTML;
            let startTime = new Date().getTime();
            for (let i = 0; i < questionCount1; i++) {
                let index = i;
                startArr.push(index > 0 ? new Date().getTime() : startTime);
                model.findAnswers(questions1[i], passage1).then((answers1) => {
                    let endTime = new Date().getTime();
                    total1 = endTime - startTime;
                    newStart = endTime - startArr[index];
                    console.log(total1, newStart);
                    document.getElementById(`qa1${index + 1}`).innerHTML = answers1[0]?.text;
                    console.log('Answers1 :', answers1);
                    document.getElementById(`time1${index + 1}`).innerHTML = `Time Taken: ${newStart}ms`;
                    document.getElementById('totalTime1').innerHTML = `Time Taken: ${total1}ms`;
                });
            }

            e.preventDefault();
        });


    document.getElementById('queSubmit2')
        .addEventListener('click', (e) => {
            var backend = document.getElementById("backend").value;
            console.log("backend:" + backend);
            startWorkload(backend);
            let startArr = [];
            let total2 = 0;
            const passage2 = document.getElementById('passage2').innerHTML;
            let startTime = new Date().getTime();
            for (let i = 0; i < questionCount2; i++) {
                let index = i;
                startArr.push(index > 0 ? new Date().getTime() : startTime);
                model.findAnswers(questions2[i], passage2).then((answers2) => {
                    let endTime = new Date().getTime();
                    total2 = endTime - startTime;
                    newStart = endTime - startArr[index];
                    console.log(total2, newStart);
                    document.getElementById(`qa2${index + 1}`).innerHTML = answers2[0]?.text;
                    console.log('Answers2 :', answers2);
                    document.getElementById(`time2${index + 1}`).innerHTML = `Time Taken: ${newStart}ms`;
                    document.getElementById('totalTime2').innerHTML = `Time Taken: ${total2}ms`;
                });
            }

            e.preventDefault();
        });

};

predict();