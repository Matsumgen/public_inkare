let filename = 'stock1_minte.csv';
let myChart = null;
let company_name = "△△株式会社";
let point = 100;
let min_data = new Map();
min_data.set("stock1_minte.csv", 10650);
min_data.set("stock2_minte.csv", 920);
min_data.set("stock3_minte.csv", 940);
min_data.set("stock1_daily.csv", 8450);
min_data.set("stock2_daily.csv", 960);
min_data.set("stock3_daily.csv", 950);
min_data.set("stock1_weekly.csv", 6150);
min_data.set("stock2_weekly.csv", 1000);
min_data.set("stock3_weekly.csv", 960);
min_data.set("stock1_reslut.csv", 900);
min_data.set("stock2_reslut.csv", 950);
min_data.set("stock3_reslut.csv", 950);
let min = min_data.get("stock1_minte.csv");

//結果の配列   0:上がる  1:下がる
let reslut = [1, 1, 0];

function print_point() {
    document.getElementById('point').innerHTML = "ポイント  " + point;
}

function hideObject(ObjectId) {
    //指定されたidの要素を非表示にする
    const Object = document.getElementById(ObjectId);
    if (Object) {
        Object.style.display = 'none';  // 要素を非表示
    }
}

function showObject(ObjectId) {
    //指定された要素を表示する
    const Object = document.getElementById(ObjectId);
    if (Object) {
        Object.style.display = '';  // 要素を表示
    }
}

async function fetchData() {
    //csvデータを読み込む
    const response = await fetch(`${filename}?t=${new Date().getTime()}`);
    const data = await response.text();
    return data.split('\n').slice(1).map(row => {
        const [name, value] = row.split(',');
        return { name, value: parseFloat(value) };
    });
}

async function drawChart() {
    //グラフを描く
    const data = await fetchData();
    const labels = data.map(d => d.name);
    const values = data.map(d => d.value);

    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // 既存のチャートを破棄
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    min: min // Y軸の最小値を設定
                }
            },
            elements: {
                point: {
                    radius: 4 // 点の半径を設定
                }
            },
            plugins: {
                legend: {
                    display: false // レジェンドを非表示に設定
                },
                tooltip: {
                    mode: 'index', // ツールチップがインデックスモードで表示されるように設定
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
        }
    });
}

async function fetchData() {
    //csvデータを読み込む
    const response = await fetch(`${filename}?t=${new Date().getTime()}`);
    const data = await response.text();
    return data.split('\n').slice(1).map(row => {
        const [name, value] = row.split(',');
        return { name, value: parseFloat(value) };
    });
}

async function fetchData2() {
    //csvデータを読み込む
    const response = await fetch(`${filename}?t=${new Date().getTime()}`);
    const data = await response.text();
    return data.split('\n').slice(1).map(row => {
        const [date, value1, value2] = row.split(',');
        return { date, value1: parseFloat(value1), value2: parseFloat(value2) };
    });
}

async function drawChart2() {
    //グラフを描く
    const data = await fetchData2();
    const labels = data.map(d => d.date);
    const values1 = data.map(d => d.value1);
    const values2 = data.map(d => d.value2);

    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // 既存のチャートを破棄
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: values1,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            },
            {
                label: '',
                data: values2,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    min: min // Y軸の最小値を設定
                }
            },
            elements: {
                point: {
                    radius: 4 // 点の半径を設定
                }
            },
            plugins: {
                legend: {
                    display: true // レジェンドを表示に設定
                },
                tooltip: {
                    mode: 'index', // ツールチップがインデックスモードで表示されるように設定
                    intersect: false
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                }
            }
        }
    });
}


function change_file() {
    //ファイル名や、パラメータを変更する
    let index = Number(filename.substring(5, 6)) + 1;
    index = index <= 3 ? index : 1;
    if (filename.substring(7, 12) == 'weekl' || filename.substring(7, 12) == 'minte' || filename.substring(7, 12) == 'daily') {
        let index = Number(filename.substring(5, 6));
        filename = 'stock' + index + '_reslut.csv';
    } else {
        let index = Number(filename.substring(5, 6)) + 1;
        index = index <= 3 ? index : 1;
        filename = 'stock' + index + '_minte.csv';
    }
    min = min_data.get(filename);
}

function change_name() {
    company_name = company_name == '△△株式会社' ? '⚪︎⚪︎株式会社' : company_name == '⚪︎⚪︎株式会社' ? '××株式会社' : '△△株式会社';
    const div = document.getElementById('company_name');
    if (div) {
        div.innerHTML = company_name; // 指定された新しい内容に変更
    }
}

async function UP() {
    let days = Number(document.getElementById('days_number').value);
    let point_in = Number(document.getElementById('point_number').value);
    if (days == '' || point_in == '') {
        alert("期間、賭け金を入力してください!");
    } else if (days < 0 || point_in < 0 || days > 30 || point_in > point) {
        alert("適切な期間、賭け金を入力してください!");
    } else {
        change_file();
        await drawChart2();
        hideObject("button");
        hideObject("bt");
        hideObject("company_name");
        if (reslut[filename.substring(5, 6) - 1] == 0) {
            document.getElementById('reslut_right').innerHTML = "お見事  +" + point_in * days * 0.1 + "ポイント";
            showObject("reslut_right");
            alert("正解!!");
            point = point + point_in * days * 0.1;
        } else {
            showObject("reslut_down");
            alert("不正解!!");
            point = point - point_in * days * 0.1;
            if (point < 0) {
                point = 0;
            }
        }
        showObject("next");
        print_point();
    }
}

async function DOWN() {
    let days = Number(document.getElementById('days_number').value);
    let point_in = Number(document.getElementById('point_number').value);
    if (days == '' || point_in == '') {
        alert("期間、賭け金を入力してください!");
    } else if (days < 0 || point_in < 0 || days > 30 || point_in > point) {
        alert("適切な期間、賭け金を入力してください!");
    } else {
        change_file();
        await drawChart2();
        hideObject("button");
        hideObject("bt");
        hideObject("company_name");
        if (reslut[filename.substring(5, 6) - 1] == 1) {
            document.getElementById('reslut_right').innerHTML = "お見事  +" + point_in * days * 0.1 + "ポイント";
            showObject("reslut_right");
            alert("正解!!");
            point = point + point_in * days * 0.1;
        } else {
            showObject("reslut_up");
            alert("不正解!!");
            point = point - point_in * days * 0.1;
            if (point < 0) {
                point = 0;
            }
        }
        showObject("next");
        print_point();
    }
}

async function NEXT() {
    change_file();
    await drawChart();
    change_name();
    hideObject("reslut_up");
    hideObject("reslut_down");
    hideObject("reslut_right");
    hideObject("next");
    showObject("button");
    showObject("bt");
    showObject("company_name");
    print_point();
    //selectedクラスのついたものを1分足にする
    const buttons = document.querySelectorAll('.select-button');
    buttons.forEach(btn => btn.classList.remove('selected')); // すべてのボタンからselectedクラスを削除
    const button1 = document.getElementById('button1');
    if (button1) {
        button1.classList.add('selected'); // idがbutton1の要素にselectedクラスを追加
    }
}

async function minute() {
    filename = filename.substring(0, 7) + 'minte.csv';
    min = min_data.get(filename);
    await drawChart();
}

async function day() {
    filename = filename.substring(0, 7) + 'daily.csv';
    min = min_data.get(filename);
    await drawChart();
}

async function week() {
    filename = filename.substring(0, 7) + 'weekly.csv';
    min = min_data.get(filename);
    await drawChart();
}

drawChart();

//結果用の要素を非表示にする
hideObject("reslut_up");
hideObject("reslut_down");
hideObject("reslut_right");
hideObject("next");
print_point();

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.select-button'); // すべての選択ボタンを選択

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected'); // クリックされたボタンに 'selected' クラスを追加
        });
    });
});
