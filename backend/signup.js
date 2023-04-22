
//회원가입
app.get('/users/signup', function(req, res) {
  res.sendFile(path.join(__dirname, '../users/signup.html'));
});

app.post('/users/signup', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    var email = req.body.email;
    var age = req.body.age;
    var gender = req.body.gender;
    console.log(username,password,email,age,gender);
    if(username,password,email,age,gender){
        connection.query('SELECT * FROM users WHERE username = ? AND password = ? AND email = ? AND age = ? ANd gender ?', [username,password,email,age,gender],function(error,results,fields){
            if (error) throw error;
            if (results.length <= 0 && password==password2) {
                connection.query('INSERT INTO user (username, password, email,age,gender) VALUES(?,?,?,?,?)', [username, password, email,age,gender],
                function (error, data) {
                    if (error)
                    console.log(error);
                    else
                    console.log(data);
                });
                  response.send('<script type="text/javascript">alert("회원가입을 환영합니다!"); document.location.href="/";</script>');    
            } else if(password!=password2){                
                response.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); document.location.href="/register";</script>');    
            }
            else {
                response.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); document.location.href="/register";</script>');    
            }            
            response.end();
        });
    } else {
        response.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/register";</script>');    
        response.end();
    }
        });


//로그인
app.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/');
                response.end();
            } else {              
                response.send('<script type="text/javascript">alert("로그인 정보가 일치하지 않습니다."); document.location.href="/login";</script>');    
            }            
        });
    } else {        
        response.send('<script type="text/javascript">alert("username과 password를 입력하세요!"); document.location.href="/login";</script>');    
        response.end();
    }
});
 
 
// 로그아웃
app.get('/logout', function(request, response) {
    request.session.loggedin = false;
    response.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');    
    response.end();
  });