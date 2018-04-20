let app_module = require('../app');
let io = app_module.io;
let score = require('../scraper/score');

io.on('connection', function (socket) {
    console.log("new member");
    socket.on('live', function () {
        setInterval(()=>{
            let data = score.updateScore();
            io.emit('live', data);
            console.log('data updated');
        },10000);
    });
    socket.on('disconnect', function () {
        console.log("a member disconnect");
    });
});