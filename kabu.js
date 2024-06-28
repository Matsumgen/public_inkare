let filename = 'stock1.csv';
let min = 1000;
let myChart = null;
let company_name = "日経平均";

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
                },
                x: {
                    max: '13:00'
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

function change_file() {
    //ファイル名や、パラメータを変更する
    filename = filename == 'stock1.csv' ? 'stock1_reslut.csv' : filename == 'stock1_reslut.csv' ? 'stock2.csv' : filename == 'stock2.csv' ? 'stock2_reslut.csv' : filename == 'stock2_reslut.csv' ? 'stock3.csv' : 'stock3_reslut.csv';
    min = min == 1000 ? 1100 : min == 1100 ? 1200 : min == 1200 ? 1300 : min == 1300 ? 1400 : 1500;
}

function change_name() {
    company_name = company_name == '日経平均' ? '⚪︎⚪︎株式会社' : '××株式会社';
    const div = document.getElementById('company_name');
    if (div) {
        div.innerHTML = company_name; // 指定された新しい内容に変更
    }
}

async function UP() {
    alert("不正解!!");
    change_file();
    await drawChart();
    hideObject("button");
    hideObject("company_name");
    showObject("reslut_up");
    showObject("next");
}

async function DOWN() {
    alert("正解!!");
    change_file();
    await drawChart();
    hideObject("button");
    hideObject("company_name");
    showObject("reslut_right");
    showObject("next");
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
    showObject("company_name");
}

drawChart();

//結果用の要素を非表示にする
hideObject("reslut_up");
hideObject("reslut_down");
hideObject("reslut_right");
hideObject("next");