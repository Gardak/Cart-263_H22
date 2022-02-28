
For this project, I decided to land on the movie 'Real Steel', an underrated film in my opinion. In the movie, people use bots to fight
instead of humans. Those fighters are controlled either by voice activated or copy the movements of the owners. To reproduce the idea
of the movie, I decided to utilize Annyang as my controller for the player. With those constraints, my bigger concern would be the balancing
of the speed of the game itself since it needs to let the player say the action and then for the browser to recognize and apply the player's actions.
I wanted to mainly focus on the balance on both the rhythm of the gameplay combined with the voice controls through the attack speed and pattern of
the enemies AI. For the AI, I went with a basic random case generator which scrolls through the multiple actions setup for the enemy bot.

To have it appear more organic, each actions has it's own duration, animation and effect on gameplay. In doing so, the player has to adapts himself
to the enemy moving instead of learning a pattern. I also worked with the timing of both the player's attack speed and each of the enemy's actions
so the player has time to properly react to the enemies actions even with using the voice controls. I also wanted to keep it easy for me while
making it interesting for the player, so I limited the window where the AI is idle and prolonged the delay before it punches so the player has time
to risk a punch and still be able to punch without constantly having a direct exchange of damage.

Finally, some of the bigger problems I went through were the integration of the Annyang to the players actions and the management of the structure
of the fighter's actions. For the Annyang part, I had difficulties since it was applied inside of the player's object. I had to use callbacks instead
of the normal commands since those would transform the object into "undefined" when integrating the commands to it. By using a callback method, I was
able to specify it was an object and properly attach both the 'punch' and 'block' Annyang functions. For the other part, I had trouble when I was near
the end of the project. The method and structure I used were reliant on some frames and other triggers, so adding other functions and controls changed
how it all interacted. If I were to restart the code itself, I would create an object for each action which would be easier to later plug and play into
the fighters and integrate the controls needed.s
