from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep
import re

base_url1 = "https://resell.seetickets.com/olympiahall/event/716/zaho-de-sagazan"
base_url2 = "https://resell.seetickets.com/olympiahall/event/715/the-dandy-warhols-the-black-angels"

username = 'azn68044@nowni.com'
password = 'Igordu34!!'

def login(driver):
    url = "https://resell.seetickets.com/olympiahall/login"
    driver.get(url)


    # Ignore cookies
    try:
        
        cookies = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CLASS_NAME, "sd-cmp-1bquj"))
            )
        cookies.click()
    finally:
        pass


    driver.find_element(By.ID, 'inputEmail').send_keys(username)
    driver.find_element(By.ID, 'inputPassword').send_keys(password)
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']")


for url in [base_url1, base_url2]:
    ### Setup
    artist = url.split('/')[-1]
    option = Options()
    option.headless = False
    driver = webdriver.Firefox(options=option)
    login(driver)
    driver.get(url)

    
    # Find events for a given artist
    events = driver.find_elements(By.CLASS_NAME, 'coupon')
    print(f'{len(events)} events for {artist}')

    # Typiquement, les evenements des 2 et 3 dec
    for event in events:
        ### Refresh a gérer ici ###

        date = event.find_element(By.CLASS_NAME, 'date')
        nbTickets = event.find_element(By.CLASS_NAME, 'nbTicket')
        
        # Dans "{} ticket(s) disponible", {} vaut "Aucun" si 0 tickets dispo
        nbTickets = re.search('\d', nbTickets.text)
        if nbTickets:
            nbTickets = nbTickets.group()
        else:
            nbTickets = 0
        print(f'{artist}, {date.text}: {nbTickets} tickets disponibles')

        # Si au moins un ticket, on clique
        if nbTickets:
            event.click()
            tickets = driver.find_elements(By.CLASS_NAME, 'ticket')
            print([el.text for el in driver.find_elements(By.TAG_NAME, 'form')])
            print(driver.find_elements(By.CSS_SELECTOR, "button[title='Ajouter au panier']"))
            print(driver.current_url)
        else:
            driver.quit()


