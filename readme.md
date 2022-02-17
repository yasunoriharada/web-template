# How To Use.

## gulpのベース環境を構築

### Node.jsをインストール
Gulpを使うためにはNode.jsが必要なので、[公式サイト](https://nodejs.org/ja/)よりNode.jsのインストーラーをダウンロード  
※個人的には推奨版がおすすめ

ダウンロードができたか、念のためバージョンを確認
```
$ node -v
```
「v14.x.x」みたいなバージョンの数字が出てきたらOK

### package.jsonファイルの作成
制作環境の対象フォルダ内で以下コマンド入力
```
$ npm init -y
```
package.jsonのベースが自動的に作成される。


### 必要なモジュールを検討・ダウンロード

- browser-sync  ブラウザのオートリロードプラグイン
- gulp-dart-sass  @use/@forwordの利用可能sass
- gulp-plumber  Stream中に起こるのエラーが原因でタスクが強制停止することを防止する


## gulpの具体的な構築方法
### gulpfile.jsにタスクを書く
```
gulp.task(name[, deps], fn)
```
- name {String}:  
実行するタスク名。[gulp タスク名]コマンドでタスクの実行が可能となります。
- deps {Array}:  
タスクを実行する前に完了しておきたい別のタスク名。タスクを実行する順番を保証したいときに指定します。
- fn:  
実行するタスク内容。一般的に「gulp.src().pipe(someplugin())」の形式で書いていきます。



### 参考文献<br>
[gulpの基本的な使い方（gulp.jsの基礎をしっかり理解する）](https://mae.chab.in/archives/2545)<br>
[絶対つまずかないGulp 4入門(2021年版)インストールとSassを使うまでの手順](https://ics.media/entry/3290/)<br>
[gulpでectを使ってみる：「gulp-ect」実践入門編](https://www.monster-dive.com/blog/web_creative/20160326_000250.php)
