const seunghakCampus = { lat: 35.1160 , lng: 128.9671 };
const buminCampus = { lat: 35.1047, lng: 129.0194 };
let cafe;
let map;
let currentLocation;

async function getApiKey() {
    const response = await fetch('/api-key');
    const data = await response.json();
    return data.apiKey;
}

window.onload = function () {
    cafe = [
        { name: '공대 5호관', lat: 35.11722, lng: 128.96810},
        { name: '도서관', lat: 35.115470, lng: 128.9676 },
        { name: '공대 4호관', lat: 35.116339, lng: 128.967228 },
        { name: '학생회관', lat: 35.115526, lng: 128.966004 },
        { name: '인문대학', lat: 35.11487, lng: 128.965646}
    ];
    loadNaverMaps(() => initializeMap(seunghakCampus));
}

async function loadNaverMaps(callback) {
    const API_KEY = await getApiKey();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${API_KEY}`;
    script.onload = callback;
    document.head.appendChild(script);
}

document.getElementById('승학').addEventListener('click', () => {
    document.getElementById('현재위치').innerText="승학 캠퍼스"
    cafe = [
        { name: '공대 5호관', lat: 35.11722, lng: 128.96810},
        { name: '도서관', lat: 35.115470, lng: 128.9676 },
        { name: '공대 4호관', lat: 35.116339, lng: 128.967228 },
        { name: '학생회관', lat: 35.115526, lng: 128.966004 },
        { name: '인문대학', lat: 35.11487, lng: 128.965646}
    ];
    loadNaverMaps(() => initializeMap(seunghakCampus));
});

document.getElementById('부민').addEventListener('click', () => {
    document.getElementById('현재위치').innerText="부민 캠퍼스"
    cafe = [{ name: '종합강의동', lat: 35.104612, lng: 129.018886},
        { name: '국제관', lat: 35.105734, lng: 129.019124 }
    ];
    loadNaverMaps(() => initializeMap(buminCampus));
});

function initializeMap(campusLocation) {
    map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(campusLocation.lat, campusLocation.lng),
        zoom: 17
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            new naver.maps.Marker({
                position: new naver.maps.LatLng(currentLocation.lat, currentLocation.lng),
                map: map,
                title: '현재 위치',
                icon : {
                    content: "<img src = '../html_scripts/img/pin.png' alt='현재 위치' width='25' height='25'>",
                    size: new naver.maps.Size(25, 25),
                    origin: new naver.maps.Point(0, 0),
                    anchor: new naver.maps.Point(11, 25)
                }
            });
            fetchPlaces(campusLocation);
        });
    }
}

function fetchPlaces(campusLocation) {
    const sortedPlaces = cafe.sort((a, b) => {
        const projection = map.getProjection();
        const LatLngA = new naver.maps.LatLng(a.lat, a.lng);
        const LatLngB = new naver.maps.LatLng(b.lat, b.lng);
        const current_Distance = new naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
        const distanceA = projection.getDistance(current_Distance, LatLngA);
        const distanceB = projection.getDistance(current_Distance, LatLngB);

        return (distanceA - distanceB);
    });

    displayPlaces(sortedPlaces);
}

function displayPlaces(places) {
    const placesList = document.getElementById('places-list');
    const projection = map.getProjection();
    const current_Distance = new naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
    placesList.innerHTML = '';
    places.forEach(place => {
        const LatLngPlace = new naver.maps.LatLng(place.lat, place.lng);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '/menu';
        a.style.textDecoration = 'none'; // 밑줄 제거
        a.style.color = 'inherit'; // 링크 클릭 시 색상 변경 방지
        a.textContent = `${place.name} - ${projection.getDistance(current_Distance, LatLngPlace).toFixed(2)}m`;

        li.appendChild(a);
        placesList.appendChild(li);

        new naver.maps.Marker({
            position: new naver.maps.LatLng(place.lat, place.lng),
            map: map,
            title: place.name
        });
    });

}
