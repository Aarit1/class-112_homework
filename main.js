Prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J9r5majSk/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var Synth = window.speechSynthesis;
    speak_data_1 = "The gesture predicted is " + prediction;
    speak_data_2 = "The accuracy is " + accuracy;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    Synth.speak(utterThis);
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = "Prediction- " + results[0].label + " gesture";
        document.getElementById("result_gesture_accuracy").innerHTML = "Accuracy- " + (results[0].confidence*100).toFixed(2)+" %";
        prediction = results[0].label;
        accuracy = (results[0].confidence*100).toFixed(1) + "percent";
        speak();
        if(results[0].label == "clap")
        {
            document.getElementById("update_gesture").innerHTML = "&#128079;- clapping";
        }
        if(results[0].label == "thumbs-up")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077;- good";
        }
        if(results[0].label == "thumbs-down")
        {
            document.getElementById("update_gesture").innerHTML = "&#128078;- bad";
        }
        if(results[0].label == "wave")
        {
            document.getElementById("update_gesture").innerHTML = "&#128400;- hi or bye";
        }
        if(results[0].label == "perfect")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076;- amazing";
        }
    }
}

