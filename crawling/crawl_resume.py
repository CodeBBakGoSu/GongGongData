from bs4 import BeautifulSoup
import requests
import json
import re
import time
import traceback
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager

def setup_driver():
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    
    # 페이지 로드 전략 변경
    chrome_options.page_load_strategy = 'eager'
    
    # 추가 안정성 옵션
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')
    chrome_options.add_argument('--ignore-certificate-errors')
    
    # User-Agent 설정
    chrome_options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36')
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    driver.implicitly_wait(5)  # 암시적 대기 시간 10초에서 5초로 감소
    
    return driver

def clean_text(text):
    # 여러 줄의 공백을 하나의 공백으로 치환
    text = re.sub(r'\s+', ' ', text)
    # HTML 엔티티 제거
    text = re.sub(r'&lt;', '<', text)
    text = re.sub(r'&gt;', '>', text)
    # 앞뒤 공백 제거
    text = text.strip()
    return text

def extract_basic_info(item):
    basic_info = {}
    
    try:
        print("항목 HTML 구조:")
        print(item.prettify())
        
        # 회사명, 직무, 시기, 채용형태 추출
        basic_info_text = item.find('p', class_='jss542')
        if basic_info_text:
            print(f"기본 정보 텍스트: {basic_info_text.text}")
            info_parts = basic_info_text.text.split(' / ')
            if len(info_parts) >= 4:
                basic_info['company'] = info_parts[0].strip()
                basic_info['position'] = info_parts[1].strip()
                basic_info['period'] = info_parts[2].strip()
                basic_info['employment_type'] = info_parts[3].strip()
        
        # 상세 정보 추출
        spec_info = item.find('h4', class_='jss543')
        if spec_info:
            print(f"상세 정보 텍스트: {spec_info.text}")
            spec_parts = spec_info.text.split(' / ')
            if len(spec_parts) >= 5:
                basic_info['school'] = spec_parts[0].strip()
                basic_info['major'] = spec_parts[1].strip()
                basic_info['gpa'] = spec_parts[2].strip()
                basic_info['toeic_speaking'] = spec_parts[3].strip()
                basic_info['experience'] = spec_parts[4].strip()
                if len(spec_parts) > 5:
                    basic_info['awards'] = spec_parts[5].strip()
                if len(spec_parts) > 6:
                    basic_info['certificates'] = spec_parts[6].strip()
        
        # 자기소개서 내용 추출
        content = item.find('h4', class_='jss540')
        if content:
            print(f"내용 미리보기: {content.text}")
            basic_info['content_preview'] = clean_text(content.text)
        
        # 스크랩 수 추출
        scrap_count = item.find('p', class_='scrap-count')
        if scrap_count:
            print(f"스크랩 수: {scrap_count.text}")
            basic_info['scrap_count'] = scrap_count.text.strip()
        
        # 링크 추출
        link = item.find('a', class_='jss544')
        if link:
            print(f"링크: {link.get('href')}")
            basic_info['link'] = link.get('href')
        
    except Exception as e:
        print(f"기본 정보 추출 중 오류 발생: {str(e)}")
    
    return basic_info

def extract_full_content(driver, link):
    try:
        if link.startswith('/'):
            link = f"https://linkareer.com{link}"
        
        print(f"페이지 접근 중: {link}")
        driver.get(link)
        time.sleep(2)  # 5초에서 2초로 감소
        
        wait = WebDriverWait(driver, 15)  # 30초에서 15초로 감소
        
        try:
            # 자기소개서 내용이 있는 article 태그 찾기
            article = wait.until(
                EC.presence_of_element_located((By.ID, 'coverLetterContent'))
            )
            print("자기소개서 내용을 찾았습니다.")
            
            # 페이지가 완전히 로드될 때까지 대기
            wait.until(
                lambda d: d.execute_script('return document.readyState') == 'complete'
            )
            
            # 페이지 스크롤
            driver.execute_script("""
                window.scrollTo(0, document.body.scrollHeight);
                return document.body.scrollHeight;
            """)
            time.sleep(1)  # 3초에서 1초로 감소
            
            # 기본 정보 추출
            basic_info = {}
            try:
                header_info = driver.find_element(By.CLASS_NAME, 'header-info')
                basic_info['header'] = header_info.text
            except:
                pass
                
            try:
                basic_info_text = driver.find_element(By.CLASS_NAME, 'basic-info')
                basic_info['basic_info'] = basic_info_text.text
            except:
                pass
                
            try:
                spec_info = driver.find_element(By.CLASS_NAME, 'spec-info')
                basic_info['spec_info'] = spec_info.text
            except:
                pass
            
            # 자기소개서 내용 추출
            main_content = article.find_element(By.TAG_NAME, 'main')
            content = main_content.text
            
            # 섹션 분리
            sections = {}
            current_section = None
            current_content = []
            
            for line in content.split('\n'):
                line = line.strip()
                if not line:
                    continue
                    
                # 섹션 시작 확인 (숫자로 시작하는 라인)
                if re.match(r'^\d+\.', line):
                    # 이전 섹션이 있으면 저장
                    if current_section:
                        sections[current_section] = '\n'.join(current_content)
                    current_section = line
                    current_content = []
                elif current_section:
                    current_content.append(line)
            
            # 마지막 섹션 저장
            if current_section:
                sections[current_section] = '\n'.join(current_content)
            
            # 섹션이 비어있는 경우 전체 내용을 하나의 섹션으로 저장
            if not sections:
                sections['전체 내용'] = content
            
            # 기본 정보와 섹션 내용을 합침
            result = {
                'basic_info': basic_info,
                'sections': sections
            }
            
            print("자기소개서 내용 추출 완료")
            return result
            
        except TimeoutException:
            print("페이지 로딩 시간 초과")
            traceback.print_exc()
            return None
        except Exception as e:
            print(f"페이지 파싱 중 오류 발생: {str(e)}")
            traceback.print_exc()
            return None
            
    except Exception as e:
        print(f"Error extracting content from {link}: {str(e)}")
        traceback.print_exc()
    
    return None

def crawl_resumes(html_content):
    print("HTML 파싱 시작...")
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Selenium 드라이버 설정
    driver = setup_driver()
    print("브라우저 설정 완료...")
    
    try:
        # jss544 클래스를 가진 모든 링크 찾기
        links = soup.find_all('a', class_='jss544')
        print(f"총 {len(links)}개의 자기소개서 링크를 찾았습니다.")
        
        if len(links) == 0:
            print("HTML 구조 확인:")
            print(soup.prettify()[:1000])  # 처음 1000자만 출력
            return []
        
        # 결과 저장
        resumes_data = []
        
        for link in links:
            try:
                # 링크 추출
                href = link.get('href')
                if not href:
                    continue
                    
                print(f"\n링크 접근 중: {href}")
                
                # 전체 내용 추출
                sections = extract_full_content(driver, href)
                if sections:
                    # 기본 정보 추출
                    basic_info = {
                        'link': href,
                        'sections': sections
                    }
                    
                    # 부모 요소에서 추가 정보 추출
                    parent = link.find_parent('div', class_='item')
                    if parent:
                        # 회사명, 직무, 시기, 채용형태 추출
                        basic_info_text = parent.find('p', class_='jss542')
                        if basic_info_text:
                            info_parts = basic_info_text.text.split(' / ')
                            if len(info_parts) >= 4:
                                basic_info['company'] = info_parts[0].strip()
                                basic_info['position'] = info_parts[1].strip()
                                basic_info['period'] = info_parts[2].strip()
                                basic_info['employment_type'] = info_parts[3].strip()
                        
                        # 상세 정보 추출
                        spec_info = parent.find('h4', class_='jss543')
                        if spec_info:
                            spec_parts = spec_info.text.split(' / ')
                            if len(spec_parts) >= 5:
                                basic_info['school'] = spec_parts[0].strip()
                                basic_info['major'] = spec_parts[1].strip()
                                basic_info['gpa'] = spec_parts[2].strip()
                                basic_info['toeic_speaking'] = spec_parts[3].strip()
                                basic_info['experience'] = spec_parts[4].strip()
                                if len(spec_parts) > 5:
                                    basic_info['awards'] = spec_parts[5].strip()
                                if len(spec_parts) > 6:
                                    basic_info['certificates'] = spec_parts[6].strip()
                        
                        # 자기소개서 내용 추출
                        content = parent.find('h4', class_='jss540')
                        if content:
                            basic_info['content_preview'] = clean_text(content.text)
                        
                        # 스크랩 수 추출
                        scrap_count = parent.find('p', class_='scrap-count')
                        if scrap_count:
                            basic_info['scrap_count'] = scrap_count.text.strip()
                    
                    resumes_data.append(basic_info)
                    print(f"{basic_info.get('company', '알 수 없음')} 자기소개서 크롤링 완료")
                
                # 서버 부하 방지를 위한 딜레이
                time.sleep(2)
                
            except Exception as e:
                print(f"링크 처리 중 오류 발생: {str(e)}")
                continue
        
        return resumes_data
    finally:
        # 브라우저 종료
        driver.quit()
        print("브라우저 종료...")

def save_to_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"{filename}에 저장되었습니다.")

def retry_on_timeout(func):
    def wrapper(*args, **kwargs):
        max_retries = 3
        retry_delay = 5
        
        for attempt in range(max_retries):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                if "timeout" in str(e).lower() and attempt < max_retries - 1:
                    print(f"타임아웃 발생. {retry_delay}초 후 재시도... (시도 {attempt + 1}/{max_retries})")
                    time.sleep(retry_delay)
                    retry_delay *= 2  # 지수 백오프
                else:
                    raise
    return wrapper

@retry_on_timeout
def load_page(driver, url):
    try:
        # 쿠키 및 캐시 삭제
        driver.delete_all_cookies()
        
        # 페이지 로드
        driver.get(url)
        
        # 초기 대기
        time.sleep(2)  # 5초에서 2초로 감소
        
        # JavaScript 렌더링 완료 대기
        wait = WebDriverWait(driver, 10)  # 20초에서 10초로 감소
        wait.until(lambda d: d.execute_script('return document.readyState') == 'complete')
        
        # 동적 콘텐츠 로딩 대기
        try:
            wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'item')))
            print("자기소개서 항목을 찾았습니다.")
        except:
            print("자기소개서 항목을 찾을 수 없습니다.")
        
        # 페이지 스크롤
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)  # 2초에서 1초로 감소
        
        # HTML 구조 출력
        html_content = driver.page_source
        soup = BeautifulSoup(html_content, 'html.parser')
        print("\nHTML 구조 확인:")
        print(soup.prettify()[:1000])
        
        return html_content
    except Exception as e:
        print(f"페이지 로드 중 오류 발생: {str(e)}")
        raise

def crawl_all_pages():
    try:
        start_url = input("크롤링을 시작할 자기소개서 URL을 입력하세요: ")
        num_resumes = int(input("크롤링할 자기소개서 개수를 입력하세요: "))
        
        driver = setup_driver()
        wait = WebDriverWait(driver, 15)  # 30초에서 15초로 감소
        
        # 입력받은 URL로 이동
        driver.get(start_url)
        print("시작 페이지 접속 완료")
        time.sleep(2)  # 5초에서 2초로 감소
        
        results = []
        crawled_urls = set()
        count = 0
        current_page = 1
        
        while count < num_resumes:
            try:
                # 사이드바 리스트가 로드될 때까지 대기
                wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.list")))
                
                # 현재 페이지의 모든 자기소개서 링크 수집
                items = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.item")))
                print(f"현재 페이지에서 {len(items)}개의 항목을 찾았습니다.")
                
                # 현재 페이지의 모든 링크 수집
                page_links = []
                for item in items:
                    try:
                        link = item.find_element(By.CSS_SELECTOR, "a")
                        url = link.get_attribute('href')
                        if url and url not in crawled_urls:
                            page_links.append(url)
                    except Exception as e:
                        print(f"링크 추출 중 오류 발생: {str(e)}")
                        continue
                
                print(f"현재 페이지에서 {len(page_links)}개의 새로운 링크를 찾았습니다.")
                
                # 각 링크에 대해 자기소개서 크롤링
                for url in page_links:
                    if count >= num_resumes:
                        break
                    
                    try:
                        print(f"\n{url} 처리 중...")
                        content = extract_full_content(driver, url)
                        
                        if content:
                            results.append({
                                'url': url,
                                'content': content
                            })
                            crawled_urls.add(url)
                            count += 1
                            print(f"{count}번째 자기소개서 추출 완료")
                        else:
                            print(f"자기소개서 추출 실패: {url}")
                            
                    except Exception as e:
                        print(f"자기소개서 처리 중 오류 발생: {str(e)}")
                        continue
                
                # 현재 페이지의 모든 항목을 처리했는지 확인
                if len(page_links) == 20 and count < num_resumes:
                    current_page += 1
                    try:
                        # 페이지 번호 버튼 찾기
                        page_buttons = wait.until(EC.presence_of_all_elements_located(
                            (By.CSS_SELECTOR, "button.button-page-number")
                        ))
                        
                        print(f"페이지 버튼 {len(page_buttons)}개를 찾았습니다.")
                        
                        # 현재 페이지 번호에 해당하는 버튼 찾기
                        next_page_found = False
                        for button in page_buttons:
                            try:
                                # span 태그 내의 텍스트 가져오기
                                button_text = button.find_element(By.CLASS_NAME, "MuiButton-label").text.strip()
                                print(f"버튼 텍스트: {button_text}")
                                if button_text == str(current_page):
                                    # JavaScript로 클릭 실행
                                    driver.execute_script("arguments[0].click();", button)
                                    time.sleep(1)
                                    print(f"{current_page}페이지로 이동했습니다.")
                                    next_page_found = True
                                    
                                    # 페이지 이동 후 새로운 링크 찾기
                                    print(f"{current_page}페이지의 새로운 링크를 찾는 중...")
                                    wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.item")))
                                    items = driver.find_elements(By.CSS_SELECTOR, "div.item")
                                    print(f"새로운 페이지에서 {len(items)}개의 항목을 찾았습니다.")
                                    
                                    # 새로운 페이지의 링크 수집
                                    page_links = []
                                    for item in items:
                                        try:
                                            link = item.find_element(By.CSS_SELECTOR, "a")
                                            url = link.get_attribute('href')
                                            if url and url not in crawled_urls:
                                                page_links.append(url)
                                        except Exception as e:
                                            print(f"새로운 페이지의 링크 추출 중 오류: {str(e)}")
                                            continue
                                    
                                    print(f"새로운 페이지에서 {len(page_links)}개의 새로운 링크를 찾았습니다.")
                                    break
                            except Exception as e:
                                print(f"버튼 처리 중 오류: {str(e)}")
                                continue
                        
                        if not next_page_found:
                            print(f"다음 페이지 버튼({current_page})을 찾을 수 없습니다.")
                            break
                            
                    except Exception as e:
                        print(f"페이지 이동 중 오류 발생: {str(e)}")
                        print("현재 페이지 HTML 구조:")
                        print(driver.page_source[:1000])
                        break
                
            except Exception as e:
                print(f"페이지 처리 중 오류 발생: {str(e)}")
                break
        
        return results
        
    except Exception as e:
        print(f"크롤링 중 오류 발생: {str(e)}")
        traceback.print_exc()
        return []
    finally:
        driver.quit()
        print("브라우저 종료...")

if __name__ == "__main__":
    print("자기소개서 크롤링을 시작합니다...")
    
    # 자기소개서 크롤링
    results = crawl_all_pages()
    
    # 결과 출력 및 저장
    if results:
        print("\n크롤링 결과:")
        print("=" * 50)
        for i, resume in enumerate(results, 1):
            print(f"\n자기소개서 {i}:")
            print("-" * 50)
            print(resume)
            print()
        
        # JSON 파일로 저장
        save_to_json(results, 'resumes_data.json')
    else:
        print("크롤링 결과가 없습니다.") 