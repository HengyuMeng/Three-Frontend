from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import os
import time
import singlepointcloud_process as process
import open3d as o3d

# 浏览器实施了CORS策略，用于限制从一个域（源）向另一个域发送的跨域请求。
# 这是出于安全考虑，以防止恶意网站通过JavaScript访问其他域的敏感数据。
# 前端代码运行在 http://localhost:63342 这个域上，而后端服务器运行在 http://127.0.0.1:5000 这个域上。
# 由于这两个域不同，浏览器会执行CORS检查,要解决这个问题，可以在后端服务器中设置适当的CORS标头，允许来自指定域的跨域请求
app = Flask(__name__)
CORS(app)

generate_2048_pointcloud_command = "export CUDA_VISIBLE_DEVICES=0 && python latent_ddpm_keypoint_conditional_generation.py --config ../exps/mesh_overall_ckpts_and_generation_results/latent_feature_ddpm_models/add_centroid_as_first_keypoint/airplane/config_latent_ddpm_s3_dim_16_32_ae_kp_noise_0.04_keypoint_conditional_airplane_ae_trained_on_airplane.json \
--ckpt ../exps/mesh_overall_ckpts_and_generation_results/latent_feature_ddpm_models/add_centroid_as_first_keypoint/airplane/pointnet_ckpt_884999.pkl \
--ema_idx 0 --batch_size 1 \
--keypoint_file ./16_singlepoints/airplane/point_cloud_normal.npz \
--save_dir ./2048_singlepoints/airplane"


@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()  # 获取前端发送的JSON数据
    voxels = data['positions']
    print(voxels)
    form_voxel_to_nromalpoints(voxels)
    time.sleep(1)
    generate_2048_pointcloud(generate_2048_pointcloud_command)
    from_points_to_mesh()
    # 返回生成的 .obj 文件给前端
    obj_file_path = './mesh_output_by_possion/mesh_airplane_depth8.obj'
    return send_file(obj_file_path, as_attachment=True)


def form_voxel_to_nromalpoints(voxels):
    r"""
    接收到前端传来的体素点，将体素点转换为待生成密集点云的 16.npz点云文件

    Args:
        voxels:
            前端传来的体素坐标二维列表，需要先将其处理为二维数组
    """
    voxel_arr = np.array(voxels)
    template = np.load('./16_template.npz')
    save_path = "./16_singlepoints/airplane/point_cloud_normal.npz"
    process.save_npz(
        template, process.normalize_point_cloud(voxel_arr), save_path)


def from_points_to_mesh():
    pointcloud = np.load(
        './2048_singlepoints/airplane/shapenet_psr_generated_data_2048_pts.npz')
    pointcloud_xyz = pointcloud['points'][0]
    pointcloud_normals = pointcloud['normals'][0]

    # 创建点云对象
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(pointcloud_xyz)
    pcd.normals = o3d.utility.Vector3dVector(pointcloud_normals)

    # 使用Poisson重建算法生成网格，depth参数控制八叉树的深度
    mesh, _ = o3d.geometry.TriangleMesh.create_from_point_cloud_poisson(
        pcd, depth=8)

    output_path = "mesh_output_by_possion"

    filename = os.path.join(
        output_path, "mesh_{}.obj".format('airplane_depth8'))
    o3d.io.write_triangle_mesh(filename, mesh)
    print("generate mesh done!")


def generate_2048_pointcloud(command):
    os.system(command)


if __name__ == '__main__':
    app.run()
