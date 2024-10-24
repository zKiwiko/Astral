# Astral
#### Disclaimer: This project is not open source. This Repository is for ease of download as well as documentation for the project.

'Astral' is a program that intergrates controller scripting/emulating into [Lua lang](https://lua.org). Its made to bring controller scripting to PC without the need of purchasing a physical device.
Astral uses a variety of frameworks to bring the best performance into scripting, thus being:

- [HidHide](https://github.com/nefarius/HidHide)

- [ViGEm Client](https://github.com/nefarius/ViGEmClient) // Used along side the ViGEm Bus Driver to be able to set data to the virtual controller.

- [ViGEm Bus Driver](https://github.com/nefarius/ViGEmBus) *

- [SDL 2](https://github.com/libsdl-org/SDL) // Used for gaining controller data

# Installation

Several things are REQUIRED for this application to work properly.

First you will need to install the [ViGEm Bus Driver](https://github.com/nefarius/ViGEmBus) for the virtual controller and emulation.
Then you will need to install [HidHide](https://github.com/nefarius/HidHide) to hide the physical controller and only show the virtual one from ViGEm.

After installing HidHide, open the HidHide configurator and add Astral to the whitelist, so its able to see the physical controller in the Application Tab.
In the devices tab, Click the checkmark next to what ever controller you have plugged in. This is show a red lock button next to the name to show it is being
blocked. At the bottom of this tab make sure to check the "Enable device hiding" box at the bottom of the devices tab to enable device hiding.

Next [install the latest VCRedist for your computer](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170).

Afterward, Restart your system to confirm the changes made.

To reverse these changes, uncheck your controller in the devices tab, and disable device hiding then restart your system.

# Introduction

Lua Scripting inside Astral has one simple requirement. Every Script must contain a `Main()` function. (case sensitive).
It is made this way so variables declared outside of `Main()` dont get reset as the lua code is ran in a while loop in C++ for preformance and consistency with the
other functions that NEED to be ran in one.

```lua
function Main() -- case sensitive. Has to be Main not main
-- code --
end
```

# Packages and Modules
Astral uses a `.ldll` (Lua Dynamic Linking Library) and `.clua` (compiled Lua) as package file types. They are both compiled by Astral; the only difference is the code inside them.
`.ldll` files contain C++ code using the Lua Library and can be called at any point during run time, Similar to calling a `.dll` file in Python or Lua. `.ldll` files can contain 
new globals Astral doesnt already contain. `.clua` contains compiled Lua code which can contain generic Lua code along with globals declared by Astral.

Astral has many built in Modules usable within your Lua Script using the "require()" function. Default Lua Modules like math, io, coroutine, dbug, base64, package, string, and table modules
are all supported natively.
The Build in Modules Astral adds can be seen down below.

## cmath
The cmath module holds math functions that are calculated in C++ opposed from lua. Aswell as some for quality of life.
The code below shows how to import it into your project. Please note that it is case sensitive and can only be imported as seen here.
It is not required to assign it to a variable but it is recommended for simplicity.
```lua
m = require("cmath")
```
The cmath module currently holds 2 functions: `convert` and `clamp`.
Convert is a quality of life function, and converts any integer or decimal number into the Stick Resolution equivelent.
```
m = require("cmath")

function Main()
print(m.convert(100)) -- will Print 32767
print(m.clamp(11, 0, 10)) -- will print 10.
end
```
`clamp` has 3 parameters. `number to clamp`, `min value`, `max value`. It will clamp the `number to clamp` between the min and max range.
`convert` has 1 parameter and can hold any number type except hexdecimal numbers like 0x01.

## globals
The `globals` module contains global variables useable within your code, and are quality of life in most cases.
It can be imported into your code with the `require()` function native to lua as seen below.
it is not necassary to assign it to a variable, but it is highly recommended for simplicity.
```lua
g = require("globals")
```
the `globals` module holds 3 values/variables.
```lua
g = require("globals")
function Main()
print(g.default) -- will print 0
print(g.set) -- will print 32767
print(g.unset) -- will print 0
print(g.res[100]) -- will print 32767
end
```
`g.res[]` holds stick resolution numbers that equate to the whole number put into it. Which can mostly be used when working with
[get_axis](#get_axis) and [set_axis](#set_axis).

Its here as an alternative to the `convert` function in the cmath module.

## https
The `https` module contains multiple functions used for Https requests. Such as GET, POST, PUT, and DELETE.
It can be imported into your code with the `require()` function native to lua as seen below.
It is not necassary to assign a variable to it, but it is highly recommended for simplicity.
```lua
h = require("https")
```
The `https` module holds 4 functions.
```
h = require("https")
function Main()
print(h.get(url)) -- will print the data the function receives from the API you put in the url param.
print(h.post(url, data)) -- will print the `data` you post to a API through the url param. (json data)
print(h.put(url, data)) -- will print the `data` you put to a API through the url param. (json data)
print(h.delele(url, data)) -- will print the `data` you delete form API though the url param. (json data)
end
```
The post, put, and delete functions only send/del data in a JSon format. Mostly for security.

# Global Functions
Functions usable within your lua script.

## init
the `init` function is extremely important. Without it, you cannot create the Virtual Controller needed for scripting. Dont Forget it.
Its not a required function as [package files](#Packages) wouldnt be able to run without having an `init`, creating more than one Virutal Controller.

```lua
init(num)
```
The num parameter can hold a 0 or 1. 0 to create an Xbox 360 (xinput) controller. and 1 to create a Dualshock (directinput) controller.
This way, Astral can be used with Remote Play for both Xbox Series X|S, Xbox One, PlayStation 4, and PlayStation 5 consoles.

## loopbreak
`loopbreak` will allow you to break out early from the Main loop. Stopping the scripts execution.
```lua
function Main()
print("Hello World")
loopbreak()
end
```
The example code will print out 'Hello World' once, then stop the main loop.
If `loopbreak` wasnt there, it would print 'Hello World' as long as it is running or until the user stops the script.

## get_axis
returns the current value of an axis within the parameter.

```lua
get_axis(Axis)
```

Valid Axis' are:
- LY -> Left Stick Up and Down on a Controller. Min range; -32767, Max range; 32767.
- LX -> Left Stick Left and Right on a Controller. Min range; -32767, Max range; 32767.
- RY -> Right Stick Up and Down on a Controller. Min range; -32767, Max range; 32767.
- RX -> Right Stick Left and Right on a Controller. Min range; -32767, Max range; 32767.

- LT -> Left trigger of a Controller. Min range; -32767, Max range; 32767.
- RT -> Right Trigger of a Controller.Min range; -32767, Max range; 32767.

With Triggers -32767 is equal to not pressing, 32767 is equal to a full press.
Use [gres](#gres) to get accurate numbers.

An example way of using get_axis is as follows:

```lua
if get_axis("LT") >= g_res[50] then
 print("True")
end
```

This example will print "True" if the Left Trigger is bring pressed passed its halfway point.

## get_key
Returns True if the parameter key is being pressed.
```lua
get_key(Key)
```
<details>
 <summary>Valid Keys Are viewable here</summary>
 
- LMB - Left Mouse Button
- RMB - Right Mouse Button
- CANCEL
- MMB - Middle Mouse Button
- FMB - Forward Thumb Button
- BMB - Back Thumb Button
- BACK
- TAB
- CLEAR
- RETURN
- SHIFT
- CONTROL
- MENU
- PAUSE
- CAPITAL
- KANA
- HANGUL
- IME_ON
- JUNJA
- FINAL
- HANJA
- KANJI
- IME_OFF
- ESCAPE
- CONVERT
- NONCONVERT
- ACCEPT
- MODECHANGE
- SPACE
- PRIOR
- NEXT
- END
- HOME
- LEFT
- UP
- RIGHT
- DOWN
- SELECT
- PRINT
- EXECUTE
- SNAPSHOT
- INSERT
- DELETE
- HELP
- 0
- 1
- 2
- 3
- 4
- 5
- 6
- 7
- 8
- 9
- A
- B
- C
- D
- E
- F
- G
- H
- I
- J
- K
- L
- M
- N
- O
- P
- Q
- R
- S
- T
- U
- V
- W
- X
- Y
- Z
- LWIN
- RWIN
- APPS
- SLEEP
- NUMPAD0
- NUMPAD1
- NUMPAD2
- NUMPAD3
- NUMPAD4
- NUMPAD5
- NUMPAD6
- NUMPAD7
- NUMPAD8
- NUMPAD9
- MULTIPLY
- ADD
- SEPARATOR
- SUBTRACT
- DECIMAL
- DIVIDE
- F1
- F2
- F3
- F4
- F5
- F6
- F7
- F8
- F9
- F10
- F11
- F12
- F13
- F14
- F15
- F16
- F17
- F18
- F19
- F20
- F21
- F22
- F23
- F24
- NUMLOCK
- SCROLL
- LSHIFT
- RSHIFT
- LCONTROL
- RCONTROL
- LMENU
- RMENU
- BROWSER_BACK
- BROWSER_FORWARD
- BROWSER_REFRESH
- BROWSER_STOP
- BROWSER_SEARCH
- BROWSER_FAVORITES
- BROWSER_HOME
- VOLUME_MUTE
- VOLUME_DOWN
- VOLUME_UP
- MEDIA_NEXT_TRACK
- MEDIA_PREV_TRACK
- MEDIA_STOP
- MEDIA_PLAY_PAUSE
- LAUNCH_MAIL
- LAUNCH_MEDIA_SELECT
- LAUNCH_APP1
- LAUNCH_APP2
- OEM_1
- OEM_PLUS
- OEM_COMMA
- OEM_MINUS
- OEM_PERIOD
- OEM_2
- OEM_3
- OEM_4
- OEM_5
- OEM_6
- OEM_7
- OEM_8
- OEM_102
- PROCESSKEY
- PACKET
- ATTN
- CRSEL
- EXSEL
- EREOF
- PLAY
- ZOOM
- NONAME
- PA1
- OEM_CLEAR

</details>

An example is as follows:
```lua
if get_key("W") then
 set_axis("LY", 32767)
end
```
This example will set the Left Sticks Y axis fully Upward as long as W is being pressed.

## get_val
Returns the current state of a controller face button. 1; True, 0; False.

```lua
get_val(Button)
```

Valid Buttons are:
- A -> A Button on an Xbox Controller, X on a Playstation one.
- B -> B Button on an Xbox Controller, Circle on a Playstation one.
- X -> X Button on an Xbox Controller, Square on a Playstation one.
- Y -> Y Button on an Xbox Controller, Triangle on a Playstation one.

- LB -> Left Bumper on an Xbox or Playstation Controller.
- RB -> Right Bumper on an Xbox or Playstation Controller.

- LS -> Left Stick Press on an Xbox or Playstation Controller.
- RS -> Right Stick Press on an Xbox or Playstation Controller.

- UP -> Up Dpad button on an Xbox or Playstation Controller.
- DOWN -> Down Dpad button on an Xbox or Playstation Controller.
- LEFT -> Left Dpad button on an Xbox or Playstation Controller.
- RIGHT -> Right Dpad Button on an Xbox or Playstation Controller.

- MENU -> Menu button on an Xbox Controller, Options on a Playstation one.
- VIEW -> View button on an Xbox Controller, Share on a Playstation one.

- GUIDE -> The guide/dashboard button on an Xbox or Playstation Controller.

Current Astral doesn't support the Share button on an Xbox controller, or the Touchpad on a Playstation Controller.

An example using these buttons are as follows:
```lua
if get_val("A") then 
 print("True") 
end
```
This example will print "True" if the A button is being pressed.

## get_press
Returns true when a button is just pressed, different from "get_val" as get_val will always return true if the button is pressed.
```lua
get_press(Button)
```
Valid buttons can be found [here](#get_val), aswell as what they correlate to for their respective platform.

An example is as follows:
```lua
if get_press("A") then
 print("A was pressed")
end
```
This example will print the message when the A button is just pressed. But wont if its held down afterward.

## get_release
Returns true when a button is released after being pressed.
```lua
get_release(Button)
```
Valid buttons can be found [here](#get_val), aswell as what they correlate to for their respective platform.

An example is as follows:
```lua
if get_release("A") then
 print("A was just released")
end
```
This example will print the message if the A button is released after being pressed.

## set_val
Will set a face button a value of 1 or 0. 0 being unpressed, 1 being pressed.

```lua
set_val(button, 1) -- Set its state to 1; pressing it.

set_val(button, 0) -- Set its state to 0; unpressing it.
```

Valid Buttons can be found in [here](#get_val), aswell as what they correlate for their respective platform.

An example of using this function is as follows:
```lua
if get_val("A") then
 set_val("B", 1)
 print("A is Pressed")
end
```
In this example, if you press the A button, Itll press the B button aswell as printing the message.

## set_axis
Will set a controller axis to a value.

```lua
set_axis(Axis, Int)
```

Valid Axis' can be seen [here](#get_axis).

The Int param can hold a number between -32768 to 32767. 
On an X axis, 32767 is fully right, and -32768 is fully left.
On an Y axis, 32767 is fully down, and -32768 is fully up.

Setting trigger axis' values are different from SDL, as SDL uses ranges from -32768 to 32767, while ViGEm uses ranges from 0 - 255. 0 being unpressed, 255 being full pressed.

An example of using this is as follows:
```lua

if get_val("A") then
 set_axis("LX", 32767)
 set_axis("LT", 255)
end
```
In this example, when the A button is being pressed, Itll set the LX axis to 32767; Fully right. While also setting the Left Trigger axis to 255; fully pressed.

## polar_axis
This function will spin the given stick in a circle.
```lua
polar_axis(Polar Axis, Radius, Angle)
```
Valid Polar Axis' are 'PL'; Left Stick, and 'PR'; Right Stick.

The Radius parameter holds how big the circle drawn will be, and Angle determines how fast it does spin.

An example is as follows:
```lua
if get_axis("LT") >= gres[90] and get_axis("RT") >= gres[90] then
        polar_axis("PL", 20, 20)
end
```
This example will spin the Left Stick with a radius of 20 (away from 0) as long as the Left and Right Trigger are held down fully.

## convert
Converts a int or floating point number into a valid stick resolution value.
```lua
convert(num)
```
The num parameter can hold either an Integer; A whole number, Or a Float number; a decimal number.

A quick example of what itll return is as follows:
```lua
print(convert(1)) -- prints 328
print(convert(1.25)) -- prints 409
```
Converted values can be used with set_axis to set decimal values to the respected axis.
```lua
set_axis("LX", convert(1.25)) -- will set the LX axis to 409
```

## sleep
Sleeps the scripts run time for a set number of miliseconds before running again.
sleep can be used to create a delay in functions, or the script as a whole.

```lua
sleep(num)
```
The num parameter can only hold an integer; whole number.

## clamp
Clamps a number between a min number and a max number.
```lua
clamp(num, min, max)
```
each parameter can only hold and integer; whole number.

An example is as follows:
```lua
Var = 11
print(clamp(Var, 0, 10)
```
Since the "Var" variable is over the max number; 10, it will clamp it to the max and print "10".

## loopctrl
Change the current speed at which controller updates are handled.
Default value is 16. One update every 60 frames.

```lua
loopctrl(num)
```
The num parameter has to be an integer; whole number, and also greater than 0. Any value close to 0 can lead to high cpu or ram usage.

## get_loopctrl
Returns the current loop delay.
```lua
get_loopdelay()
```

# Lua Loops

using while or for loops in your Lua script may cause issues. The lua code is ran in a threaded loop along side a C++ function that maps physical inputs to the virtual controller.
Be careful when using loops.








 

