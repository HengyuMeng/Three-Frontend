import numpy as np
import open3d as o3d
import os


def print_info(points_single):
    print("point_single:", points_single.files)
    print("point_single_points:", points_single['points'])
    print("label:", points_single['label'])
    print("category:", points_single['category'])
    print("category_name:", points_single['category_name'])


def save_npz(points, points_arr):
    """
    保存单个点云，注意要具有符合原模型要求的一些键值对
    :param points: 待保存的点云
    :return: 符合模型规范的点云的.npz文件
    """
    np.savez("point_cloud_normal.npz", points=np.array([points_arr]), label=np.array([points['label'][0]]),
             category=np.array([points['category'][0]]),
             category_name=np.array([points['category_name'][0]]))


def visualization_pointcloud(points_arr):
    """
    传入点云坐标的二维数组，将其可视化
    :param points_arr: 点云坐标的二维数组
    """
    # 创建点云对象
    pointcloud = o3d.geometry.PointCloud()
    pointcloud.points = o3d.utility.Vector3dVector(points_arr)

    # 创建可视化窗口并添加点云
    vis = o3d.visualization.Visualizer()
    vis.create_window()
    vis.add_geometry(pointcloud)

    # 设置摄像机视角并渲染窗口
    ctr = vis.get_view_control()
    ctr.set_lookat([0, 0, 0])  # 设置观察点为原点
    ctr.set_zoom(2.0)  # 设置缩放系数
    vis.run()


def normalize_point_cloud(points, noise_std=0.01):
    """
    将用户自定义的点云做正则化分布处理，以符合SLIDE模型的输入规范
    :param points: 用户自定义的点云
    :return: 正则化后，坐标值在1到-1范围之间的点云
    """
    # 获取每个维度的最小值和最大值
    min_values = np.min(points, axis=0)
    max_values = np.max(points, axis=0)

    # 计算范围和缩放比例
    ranges = max_values - min_values
    scale = 2.0 / np.max(ranges)

    # 均值归一化处理
    normalized_points = (points - np.mean(points, axis=0)) * scale

    # 添加噪声
    noise = np.random.normal(scale=noise_std, size=points.shape)
    normalized_points += noise

    return normalized_points


if __name__ == '__main__':
    points = np.load('./pointcloud_16/shapenet_psr_generated_data_16_pts.npz')
    points_single = np.load('point_cloud_normal.npz')
    print_info(points_single)

    # 前端用户自定义体素后，将坐标信息存为一个二维数组
    points_arr = np.array(
        [[25, 25, -25],
         [25, 25, -75],
         [25, 25, -125],
         [75, 25, -125],
         [125, 25, -125],
         [-25, 25, -125],
         [-75, 25, -125],
         [25, 25, -175],
         [25, 25, -225],
         [175, 25, -125],
         [-75, 75, -125],
         [-75, 75, -175],
         [-75, 75, -75],
         [75, 25, -75],
         [75, 25, -175],
         [225, 25, -125]])

    save_npz(points, normalize_point_cloud(points_arr))
    visualization_pointcloud(normalize_point_cloud(points_arr))
