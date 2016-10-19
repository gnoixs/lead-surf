# 初始化项目
    1. 创建目录 mkdir lead-surf && cd lead-surf   
    2. 生成项目 express -e
    3. 添加依赖 cd . && npm install
    4. 启动预览 DEBUG=lead-surf:* npm start
    5. 添加README.md文件 touch README.md

# 热部署及静态服务器
    npm install node-dev --save-dev                 #package.json "node-dev ./bin/www"
    npm install http-server --save-dev              #http-server -a localhost -p 3000
    
# 集成gulp
    npm install gulp --save
    npm install gulp-concat --save-dev
    npm install gulp-clean-css --save-dev
    npm install gulp-rename --save-dev
    npm install gulp-uglify --save-dev
    npm install gulp-imagemin --save-dev
    npm install gulp-sass --save-dev
    npm install gulp-notify --save-dev
    npm install gulp-clean --save-dev
    touch gulpfile.js

# 集成bower
    npm install bower --save
    bower init       #windows cmd
    touch .bowerrc   #"directory":"public/libs"
    
# 初始化git仓库
    git init
    touch .gitignore

# 第一版目录结构
[lead-surf]
    ├── bin
    │   └── www
    ├── data
    │   └── 201611RedPocket
    ├── node_modules                                                                      
    ├── public
    │   └── 201611RedPocket
    │       ├── images
    │       ├── scripts
    │       ├── style
    │       └── TheFirstWeek.html
    ├── routes
    │   ├── index.js
    │   └── 201611RedPocket.js
    ├── test
    │   ├── e2e
    │   └── unit
    ├── views
    │   ├── error.ejs
    │   └── index.ejs
    ├── .bowerrc
    ├── .gitignore
    ├── app.js
    ├── bower.json
    ├── gulpfile.js                                       
    ├── package.json
    └── README.md