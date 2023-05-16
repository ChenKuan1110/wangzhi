// 全局变量
let openid = ''  // 用户 openid
let queryTimerId = null // 轮询定时器

// 获取 code
// async function config() {
//   const queryString = location.search;
//   const params = new URLSearchParams(queryString);
//   const code = params.get("code");
//   console.log("code=", code);
//   const resp = await fetch("/page/config", {
//     method: "POST",
//     headers: {
//       ContentType: "application/json;charset=utf-8",
//     },
//     body: JSON.stringify({
//       code: code,
//     }),
//   });
//   const res = resp.json();
//   console.log("发送code 接口", res);
//   if (res.code !== 0) {
//     // 用户 openid 获取失败
//     // 显示提示
//     showAlert("没有获取到用户信息,暂不能展示历史记录", "info", false);
//   } else {
//     // TODO: 解析出 openid,全局保存
//   }
// }

function showAlert(message, className = "danger", clearable = true) {
  const div = document.createElement("div");
  div.className = `alert alert-${className} mt-2`;
  div.innerText = message;
  const container = document.querySelector(".container");
  const form = document.querySelector("#form");
  container.insertBefore(div, form);
  if (clearable) {
    setTimeout(() => {
      div.remove();
    }, 3000);
  }
}

async function sendCode(code) {
  const resp = await fetch("/page/code", {
    method: "POST",
    body: JSON.stringify({
      code: code,
      openid: "fake_openId",
    }),
  });
  console.log(resp);
  const res = await resp.json();
  console.log("发送设备码 api", res);
  const { code: _code } = res
  if (_code !== 0) {
    showAlert(res.msg || '启动设备出现异常！')
    // 清空设备码
    document.querySelector('#input_no').value = ''
  } else {
    showAlert("启动设备成功", 'success')
    // 修改按钮文字
    document.querySelector('#btn').textContent = '启动成功'
    // 按钮不可点击
    document.querySelector('#btn').disabled = true
    // 设备码输入框不能输入
    document.querySelector('#input_no').disabled = true
    // 轮询结果
    const code = document.querySelector('#input_no').value
    if(!code) return
    queryResult(code, openid)
  }
}


// 获取查询结果
async function queryResult (code, uid) {
  console.log('查询结果：')
  queryTimerId = setInterval(async () => {
    const resp = await fetch(`/page/result?no=${code}&uid=${uid}`, {
      method: 'GET',
    })
    const res = await resp.json()
    if (res.code === 0) {
      // TODO:解析状态
      renderResult(res.data)
      // 关闭定时器
      clearInterval(queryTimerId)
      queryTimerId = null;
      // 恢复按钮文字及可用状态
      document.querySelector('#btn').textContent = '启动设备'
      document.querySelector('#btn').disabled = false
      // 恢复输入框可用
      document.querySelector('#input_no').disabled = false
      // 取消显示 loading 
      hideLoading()
    } else if (res.code === -1) { // 还没有结果
      console.log('还没有结果')
      showLoading(true)
    } else {
      showAlert(res.msg || '获取状态发生错误')
      clearInterval(queryTimerId)
    }
  }, 2000)
}

function showLoading () {
  document.querySelector('#loading').style.display = 'block'
}

function hideLoading () {
  document.querySelector('#loading').style.display = 'none'
  
}


function renderResult (data) {
  console.log('渲染结果', data)
  const resultDiv = document.querySelector("#result")
  // resultDiv.innerHTML = JSON.stringify(data, null, 2)
  // 
  const htmlStr = `
  <div class="card text-white bg-primary mb-2">
    <div class="card-header">诊断编号: ${data.resultId}</div>
  </div>
  <div class="card text-white bg-primary mb-2">
    <div class="card-header">诊断结果</div>
    <div class="card-body">
      <p class="card-text">${data.guidance}</p>
    </div>
  </div>
  <div class="card text-white bg-primary mb-2">
    <div class="card-header">食疗保健</div>
    <div class="card-body">
      <p class="card-text">${data.food}</p>
    </div>
    <img src="${data.img}" alt="" style="width:100%" />
  </div>
  `
  resultDiv.innerHTML = htmlStr
}

function main () {
  // 发送 code 
  // config();

  // 页面逻辑
  const input = document.querySelector("#input_no");
  const btn = document.querySelector("#btn");

  // 按钮不可用
  btn.disabled = true;

  // 加载隐藏
  document.querySelector('#loading').style.display = 'none'

  // 取消表单默认事件
  document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //输入
  input.addEventListener("input", (e) => {
    btn.disabled = !(e.target.value.length > 0);
  });

  // 按钮
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const val = input.value;
    if (!val) {
      showAlert("请输入望知设备编号");
      document.querySelector("#input_no").focus();
      return;
    }
    sendCode(val);
  });

  // 操作步骤 显示隐藏
  document.querySelector("#heading-step").addEventListener('click', (e) => {
    e.target.classList.toggle('collapsed')
    setTimeout(() => {
      document.querySelector('#collapseStep').classList.toggle("show")
    }, 200)
  })
}

main();
