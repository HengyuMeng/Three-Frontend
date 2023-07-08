from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import singlepointcloud_process as process

# 浏览器实施了CORS策略，用于限制从一个域（源）向另一个域发送的跨域请求。
# 这是出于安全考虑，以防止恶意网站通过JavaScript访问其他域的敏感数据。
# 前端代码运行在 http://localhost:63342 这个域上，而后端服务器运行在 http://127.0.0.1:5000 这个域上。
# 由于这两个域不同，浏览器会执行CORS检查,要解决这个问题，可以在后端服务器中设置适当的CORS标头，允许来自指定域的跨域请求
app = Flask(__name__)
CORS(app)


@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()  # 获取前端发送的JSON数据
    # 在这里对数据进行处理
    print(data)
    position = data['positions']
    print(position)
    processed_data = position
    return jsonify(processed_data)


if __name__ == '__main__':
    app.run()
