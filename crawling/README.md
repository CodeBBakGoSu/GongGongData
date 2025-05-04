# 자기소개서 크롤링 프로젝트

## 환경 설정 방법

### 1. UV 설치
```bash
# macOS
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
(Invoke-WebRequest -Uri "https://astral.sh/uv/install.ps1" -UseBasicParsing).Content | pwsh -Command -
```

pip 를 이용해서도 가능합니다!

```bash
pip install uv
```


### 2. 가상환경 생성 및 활성화
```bash
# 가상환경 생성
uv venv

# 가상환경 활성화
# macOS/Linux
source .venv/bin/activate

# Windows
.venv\Scripts\activate
```

### 3. 의존성 패키지 설치
```bash
uv pip install -r requirements.txt
```

### 4. Chrome 브라우저 설치
- [Chrome 브라우저](https://www.google.com/chrome/)를 설치해주세요.

## 실행 방법
```bash
python crawl_resume.py
```

## 주의사항
- Chrome 브라우저가 설치되어 있어야 합니다.
- 인터넷 연결이 필요합니다.
- 크롤링할 자기소개서 URL과 개수를 입력해야 합니다. 
- 크롤링할 자기소개서의 url 은 
https://linkareer.com/cover-letter/34501?page=1&sort=PASSED_AT&tab=all
이와같이 링커리어 자기소개서 자세히보기? 와 같은 형식으로 입력하면 됩니다!
