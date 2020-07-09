import skywriter
import signal
from subprocess import call
import random
import sys, pygame, pygame.mixer
from pygame.locals import *
from time import *
import sys
pygame.init() 


WINDOWIDTH = 760
WINDOWHEIGHT = 600
BLACK = (0,0,0)
white = (255, 255, 255) 
green = (0, 255, 0) 
blue = (0, 0, 128)
highscore = 0


font = pygame.font.Font('freesansbold.ttf', 32) 
displayScore = font.render(str(highscore), True, green, blue)
f = open("score.txt", "r")
highdisplay = "Best Score: " + f.read()
f = open("score.txt", "r")
compare = f.read()

high = font.render(highdisplay, True, green, blue)


catImg = pygame.image.load('cat1.png')
catImg = pygame.transform.scale(catImg,(100,150))
catx = 20
caty = 350

enemy = pygame.image.load('enemy.png')
enemy = pygame.transform.scale(enemy,(50,50))
enx = random.randint(700, 2100)
eny = 450

dog = pygame.image.load('dog.png')
dog = pygame.transform.scale(dog,(200,200))
dogx = random.randint(700, 2100)
dogy = 350

physics = 8

beforeGame = 0
print(beforeGame)
def play():
    while beforeGame != 1:
        @skywriter.double_tap()
        def doubletap(position):
            global beforeGame
            beforeGame = 1

play()

while beforeGame == 1:
    def initialise():
        pygame.init()
        surface = pygame.display.set_mode((WINDOWIDTH, WINDOWHEIGHT), FULLSCREEN)
        pygame.display.set_caption('Cat Run')
        surface.fill(BLACK)
        return surface

    WindowSurface = initialise()


    def update():
        global running
        for event in pygame.event.get():
            if event.type == QUIT:
                running = False
                
            
                
    def draw():
        WindowSurface.fill(BLACK)
        WindowSurface.blit(enemy, (enx,eny))
        WindowSurface.blit(dog, (dogx,dogy))
        WindowSurface.blit(catImg, (catx, caty))
        WindowSurface.blit(displayScore, (10, 10))
        WindowSurface.blit(high, (400, 10))  
        pygame.display.update()    
        
    running = True
    sprite = 0
    change = 1
    jump = 0
    doubleJump = 0
    while running:
        enx -= 3
        dogx -= 3
        sprite +=3
        if sprite == 27:
            change += 1
            if change == 1:
                catImg = pygame.image.load('cat1.png')
                sprite = 0
            elif change == 2:
                catImg = pygame.image.load('cat2.png')
                sprite = 0
            elif change == 3:
                catImg = pygame.image.load('cat3.png')
                sprite = 0
            elif change == 4:
                catImg = pygame.image.load('cat4.png')
                sprite = 0
            elif change == 5:
                catImg = pygame.image.load('cat5.png')
                sprite = 0
            elif change == 6:
                catImg = pygame.image.load('cat6.png')
                sprite = 0
            elif change == 7:
                catImg = pygame.image.load('cat7.png')
                sprite = 0
            elif change == 8:
                catImg = pygame.image.load('cat8.png')
                change = 1
                sprite = 0    
                
        catImg = pygame.transform.scale(catImg,(100,150))
        

        if enx <= -100:
            enx = random.randint(700, 2100);
            highscore += 1
            displayScore = font.render(str(highscore), True, green, blue)
            saveScore = str(highscore)
            
        
        if dogx <= -200:
            dogx = random.randint(700, 2100);
            highscore += 2
            displayScore = font.render(str(highscore), True, green, blue)
            saveScore = str(highscore)
            
            if highscore > int(compare):
                f = open("score.txt", "w")
                f.write(saveScore)
                f.close()
            
            f = open("score.txt", "r")
            highdisplay = "Best Score: " + f.read()
            f = open("score.txt", "r")
            compare = f.read()
            high = font.render(highdisplay, True, green, blue)
            
                
        @skywriter.tap()
        def tap(position):
            print('Tap!', position)
            global jump
            jump = 1
            
        @skywriter.flick()
        def flick(start,finish):
            print('Got a flick!', start, finish)
            if start == 'south':
                global doubleJump
                doubleJump = 1

        
        if jump == 1:
            while caty >= 200:
                caty -= physics
                physics -= 0.2
                enx -= 3
                dogx -=3
                update()
                draw()
            while caty <= 350:
                caty += physics
                physics += 0.1
                enx -= 3
                dogx -=3
                update()
                draw()
            caty = 350
            physics = 8
            jump = 0
            
        if doubleJump == 1:
            while caty >= 50:
                caty -= physics
                physics -= 0.1
                enx -= 3
                dogx -=3
                update()
                draw()
            while caty <= 350:
                caty += physics
                physics += 0.1
                enx -= 3
                dogx -=3
                update()
                draw()
            caty = 350
            physics = 10
            doubleJump = 0
        
        if eny >= caty + 100 and eny + 20 >= caty and enx <= catx and enx + 30 >= catx:
            print('GAME OVER')
            beforeGame = 0
            pygame.quit()
            sys.exit(0)
        if dogy >= caty and dogy + 70 >= caty and dogx <= catx and dogx + 80 >= catx:
            print('DOG OVER')
            beforeGame = 0
            pygame.quit()
            sys.exit(0)  

        update()
        draw()
        
    pygame.quit()       

