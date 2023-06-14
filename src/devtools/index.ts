function sendMessage(data: any) {
  console.log('我发送了信息给background：', data);
  return new Promise((resolve) => {
    window.chrome.runtime.sendMessage(data, function (res: any) {
      resolve(res);
    });
  })
}

var data = {
  order: 'devtools',
  msg: '我是devtools~'
};

sendMessage(data).then(res => {
  console.log("我接收到了background的信息:", res);
})

window.chrome.devtools.panels.create(
  'Panel-A',
  'static/images/logo.png',
  "panel1.html",
  function (panel: any) {
    console.log('自定义面板创建成功！', panel); // 注意这个log一般看不到
  }
);

window.chrome.devtools.panels.create(
  'Panel-B',
  'static/images/logo.png',
  "panel2.html",
  function (panel: any) {
    console.log('自定义面板创建成功！', panel); // 注意这个log一般看不到
  }
);

// 创建自定义侧边栏，控制台 -> 元素 -> 自定义侧边栏
window.chrome.devtools.panels.elements.createSidebarPane("ChromeVue3", function (sidebar: any) {
  sidebar.setExpression('document.querySelectorAll("img")', 'All Images');
});

// 监听网络
function handleRequestFinished(request: any) {
  // 打印到前台
  console.log("Server IP: ", request.serverIPAddress);
}
window.chrome.devtools.network.onRequestFinished.addListener(handleRequestFinished);