import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader, FontLoader, TextGeometry} from "three/addons";


// Создаем сцену
const scene = new THREE.Scene();

// Добавляем камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Добавляем рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);
renderer.setClearColor(0x0e1621, 1); // Устанавливаем белый цвет фона
renderer.antialias = true;




// Создаем геометрию и материал для числа 8
// const geometry = new THREE.TorusGeometry(1, 0.5, 8, 24); // Параметры: радиус тора, радиус трубки, количество сегментов по окружности, количество сегментов по длине
// const material = new THREE.MeshBasicMaterial({ color: 0xf08dbb }); // Нежно-розовый цвет
// const eight = new THREE.Mesh(geometry, material);

// Добавляем число 8 на сцену
const loader = new GLTFLoader();
camera.position.z = 5;



loader.load(

    // Путь к файлу GLTF
    '008.glb',
    // Функция обратного вызова, которая будет вызвана после загрузки модели
    function (gltf) {
        // Получаем объект сцены из загруженного GLTF файла
        const model = gltf.scene;

        model.scale.set(4,4,4)


        // Добавляем модель на сцену
        scene.add(model);
        function updateFontSize(){

        }
        const fontLoader = new FontLoader()
        fontLoader.load('tinkoff.json', function (font) {
            const geometry = new TextGeometry('Поздравляю Вас с прекрасным женским днем!', {
                font: font,
                size: window.innerWidth < 768 ? 0.1 : 0.2, // Уменьшенный размер текста
                height: 0.02, // Высота текста
                curveSegments: 40,
                bevelEnabled: false
            })
            geometry.computeBoundingBox();
            const textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;

            const textMaterial = new THREE.MeshNormalMaterial();
            var textMesh = new THREE.Mesh(geometry, textMaterial);
            textMesh.position.set(model.position.x-textWidth/2, model.position.y-2, 0); // Позиция текста под цифрой 8
            scene.add(textMesh);
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }
            animate();
        })
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.x += 0.005
            model.rotation.y += 0.005
            renderer.render(scene, camera);
        }

        // Вызываем функцию анимации

        animate();

    },
    // Функция обратного вызова в случае ошибки загрузки
    function (error) {
        console.error('Ошибка загрузки модели:', error);
    }
);

window.addEventListener('resize', function () {
    // Обновляем размеры рендерера и камеры при изменении размеров окна
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});