# 📌 Todo App

간단한 할 일 관리 애플리케이션입니다. 사용자가 새로운 할 일을 추가하고, 완료 여부를 체크하며, 편집 및 삭제할 수 있습니다. 또한, 모든 데이터는 `localStorage`에 저장되어 새로고침 후에도 유지됩니다.

## 🚀 주요 기능

- **할 일 추가**: `ADD` 버튼을 눌러 입력 창을 띄우고 새로운 할 일을 추가할 수 있습니다.
- **할 일 완료 표시**: 체크박스를 클릭하면 완료된 항목에 `line-through` 스타일이 적용됩니다.
- **할 일 수정**: `Edit` 버튼을 클릭하면 해당 항목을 편집할 수 있습니다.
- **할 일 삭제**: `Delete` 버튼을 클릭하면 항목이 제거됩니다.
- **데이터 저장**: `localStorage`에 저장되어 새로고침 후에도 데이터가 유지됩니다.

## 🛠️ 기술 스택

- **HTML5**: 마크업 구조 작성
- **CSS3**: 스타일링 및 레이아웃 디자인 (`styles.css` 파일)
- **JavaScript (ES6)**: 이벤트 핸들링, 데이터 조작, DOM 조작
- **LocalStorage**: 데이터 영구 저장

## 📂 프로젝트 구조

```
/todo-app
│── /styles
│   ├── reset.css          # 브라우저 기본 스타일 초기화
│   ├── styles.css         # Todo 앱의 전반적인 UI 스타일 정의
│
│── /scripts
│   ├── index.js           # 앱의 진입점. TodoApp 초기화 및 이벤트 흐름 관리
│   ├── todoService.js     # Todo 데이터 저장 및 처리 (비즈니스 로직)
│   ├── todoRenderer.js    # Todo 목록 렌더링 담당 (UI 그리기)
│   ├── todoBinder.js      # Todo 항목에 대한 이벤트 바인딩/해제 처리
│
│── index.html             # 메인 HTML 파일.
│── README.md              # 프로젝트 설명
```

## 🎮 사용 방법

1. 프로젝트를 클론

   ```sh
   git clone -b feat/todo --single-branch git@github.com:Shin-Yu-1/clone.git


   cd todo-app
   ```

2. 폴더 이동
   ```sh
   cd todo-app
   ```
3. Live Server 또는 브라우저에서 index.html 파일 열기

## 📸 UI 스크린샷

![image](https://github.com/user-attachments/assets/b98c2055-7498-42dd-bf94-1a8cde20a5af)
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/adc1d61a-fe4e-4b63-90a6-4e49d0f51ed6" />

## 📌 개선할 점

- 애니메이션 추가하여 사용자 경험 개선
- 다크 모드 지원
- 데이터 백엔드 서버 연동 (예: Firebase, Express.js)
