function calculate(data) {
    let inputType = document.querySelector('input[name="inputType"]:checked').value;
    let results = {}; 


    let hasSelectedTask = ['task1', 'task2', 'task3', 'task4'].some(task => data[task].checked);
    if (!hasSelectedTask) {
        document.getElementById('findLabel').classList.add("errorText");
        flag = false;
    }

    if (inputType === "hypotenuseAngle") { 
        results = mathWithHypotenuseAngle(data);
    } else { 
        results = mathWithTwoKatets(data);
    }

    displayResults(results);
}

function mathWithHypotenuseAngle(data){
    let c = parseFloat(data.input1.value);
    let angle = parseFloat(data.input2.value);
    let results = {};
    let flag = true;

    if (isNaN(c) || c <= 0) {
        data.input1.classList.add("error");
        flag = false;
    }
    
    if (isNaN(angle) || angle <= 0 || angle >= 90) {
        data.input2.classList.add("error");
        flag = false;
    }

    if (!flag) return;


    let rad = angle * Math.PI / 180;
    let a = c * Math.sin(rad);
    let b = c * Math.cos(rad);

    if (data.task1.checked) {
        results.medians = {
            m_a: Math.sqrt(b*b + (a/2)**2),
            m_b: Math.sqrt(a*a + (b/2)**2),
            m_c: c/2
        };
    }
    
    if (data.task2.checked) {
        results.height = (a*b)/c;
    }
    
    if (data.task3.checked) {
        results.circumradius = c/2;
    }
    
    if (data.task4.checked) {
        results.area = (a*b)/2;
    }

    return results;
}

function mathWithTwoKatets(data){
    let a = parseFloat(data.inputA.value);
    let b = parseFloat(data.inputB.value);
    let flag = true;
    let results = {};

    if (isNaN(a) || a <= 0) {
        data.inputA.classList.add("error");
        flag = false;
    }
    if (isNaN(b) || b <= 0) {
        data.inputB.classList.add("error");
        flag = false;
    }
    
    if (!flag) return;

    let c = Math.sqrt(a*a + b*b);
    
    if (data.task1.checked) {
        results.medians = {
            m_a: Math.sqrt(b*b + (a/2)**2),
            m_b: Math.sqrt(a*a + (b/2)**2),
            m_c: c/2
        };
    }
    
    if (data.task2.checked) {
        results.height = (a*b)/c;
    }
    
    if (data.task3.checked) {
        results.circumradius = c/2;
    }
    
    if (data.task4.checked) {
        results.area = (a*b)/2;
    }

    return results;
}


function clearData(form) {
    [form.input1, form.input2, form.inputA, form.inputB].forEach(input => {
        if (input) input.value = '';
    });

    ['task1', 'task2', 'task3', 'task4'].forEach(task => {
        form[task].checked = false;
    });


    document.getElementById('output').innerHTML = '';
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.getElementById('findLabel').classList.remove('errorText');
}

function switchInputType() {
    let inputType = document.querySelector('input[name="inputType"]:checked').value;
    
    document.getElementById("hypotenuseAngleInputs").style.display = 
        inputType === "hypotenuseAngle" ? "block" : "none";
    document.getElementById("twoLegsInputs").style.display = 
        inputType === "twoLegs" ? "block" : "none";
        
    document.getElementById("triangleImage").src = 
        inputType === "hypotenuseAngle" 
            ? "photo/Треугольник с гипотенузой и углом.png" 
            : "photo/Треугольник и 2 катета.png";
    
    clearData(document.querySelector('form'));

}

function displayResults(results) {
    let flag = false;
    const output = document.getElementById('output');
    output.innerHTML = '';
    
    if (results.medians) {
        output.innerHTML += `
            <p>Медианы:
            <br>m<sub>a</sub> = ${results.medians.m_a.toFixed(2)}
            <br>m<sub>b</sub> = ${results.medians.m_b.toFixed(2)}
            <br>m<sub>c</sub> = ${results.medians.m_c.toFixed(2)}
            </p>`;
        flag = true;
    }
    
    if (results.height) {
        output.innerHTML += `<p>Высота: ${results.height.toFixed(2)}</p>`;
        flag = true;
    }
    
    if (results.circumradius) {
        output.innerHTML += `<p>Радиус описанной окружности: ${results.circumradius.toFixed(2)}</p>`;
        flag = true;
    }
    
    if (results.area) {
        output.innerHTML += `<p>Площадь: ${results.area.toFixed(2)}</p>`;
        flag = true;
    }

    if (!flag) {
        output.innerHTML = ''; 
    } else {
        output.innerHTML = '<p>Результаты:</p>' + output.innerHTML;
    }
}


document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('focus', function() {
        this.classList.remove('error');
    });
});

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('focus', function() {
        document.getElementById('findLabel').classList.remove('errorText');
    });
});