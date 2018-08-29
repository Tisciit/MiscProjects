window.onload = function () {
    let drop = this.document.getElementById("c_cipher");

    for (let c of Object.getOwnPropertyNames(CIPHERS)) {
        let option = this.document.createElement("option");
        option.text = c;
        drop.add(option);
    }

    drop.onchange = function () {
        CIPHERS[drop.value]();
    }
    drop.onchange();
}

const CIPHERS = {
        ROT: function () {
            let parent = document.getElementById("root");
            clearChildren(parent);

            let input1 = document.createElement("textarea");
            input1.id = "decoded";

            let slider = document.createElement("input");
            slider.id = "slider";
            slider.classList.add("slider");
            slider.setAttribute("type", "range");
            slider.setAttribute("min", 1);
            slider.setAttribute("max", 25);
            
            let text = document.createElement("label");
            text.id = "slidervalue";

            let container = document.createElement("div");
            container.classList.add("slidecontainer");
            container.appendChild(text);
            container.appendChild(slider);


            let input2 = document.createElement("textarea");
            input2.id = "encoded";

            input1.onchange = function () {
                input2.value = Codes.ROTCipher(input1.value, slider.value, OPERATIONS.ENCODE);
            }

            slider.oninput = function () {
                input2.value = Codes.ROTCipher(input1.value, slider.value, OPERATIONS.ENCODE);
                text.innerHTML = slider.value;
            }

            input2.onchange = function () {
                input1.value = Codes.ROTCipher(input2.value, slider.value, OPERATIONS.DECODE);
            }

            parent.appendChild(input1);
            parent.appendChild(container);
            parent.appendChild(input2);
        },

        CAESAR: function () {
            let parent = document.getElementById("root");
            clearChildren(parent);

            let input1 = document.createElement("textarea");
            input1.id = "decoded";

            let input2 = document.createElement("textarea");
            input2.id = "encoded";

            input1.onchange = function () {
                input2.value = Codes.CaesarCipher(input1.value, OPERATIONS.ENCODE);
            }

            input2.onchange = function () {
                input1.value = Codes.CaesarCipher(input2.value, OPERATIONS.DECODE);
            }

            parent.appendChild(input1);
            parent.appendChild(input2);
        },

        A1Z26: function () {
            let parent = document.getElementById("root");
            clearChildren(parent);
            let input1 = document.createElement("textarea");
            input1.id = "decoded";

            let input2 = document.createElement("textarea");
            input2.id = "encoded";

            input1.onchange = function () {
                input2.value = Codes.A1Z26(input1.value, OPERATIONS.ENCODE);
            }

            input2.onchange = function () {
                input1.value = Codes.A1Z26(input2.value, OPERATIONS.DECODE);
            }

            parent.appendChild(input1);
            parent.appendChild(input2);
        },

        Vigenere: function () {
            let parent = document.getElementById("root");
            clearChildren(parent);
            let input1 = document.createElement("textarea");
            input1.id = "decoded";

            let key = document.createElement("input");
            key.id = "decoded";
            key.class = "key";

            let input2 = document.createElement("textarea");
            input2.id = "encoded";

            input1.oninput = function () {
                input2.value = Codes.Vigenere(input1.value, key.value, OPERATIONS.ENCODE);
            }

            key.oninput = function() {
            input2.value = Codes.Vigenere(input1.value, key.value, OPERATIONS.ENCODE);
        }

        input2.oninput = function () {
            input1.value = Codes.Vigenere(input2.value, key.value, OPERATIONS.DECODE);
        }

        parent.appendChild(input1);
        parent.appendChild(key);
        parent.appendChild(input2);
    },
}

function clearChildren(control) {
    while (control.firstChild) {
        control.removeChild(control.firstChild);
    }
}