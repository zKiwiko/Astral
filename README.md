# Astral
#### Disclaimer: This project is not open source. This Repository is for ease of download as well as documentation for the project.

'Astral' is a program that intergrates controller scripting/emulating into [Lua lang](https://lua.org). It made to bring controller scripting to PC without the need of purchasing a physical device.
Astral uses a variety of frameworks to bring the best performance into scripting, thus being:

- [HidHide](https://github.com/nefarius/HidHide)

- [ViGEm Client](https://github.com/nefarius/ViGEmClient) // Used along side the ViGEm Bus Driver to be able to set data to the virtual controller.

- [ViGEm Bus Driver](https://github.com/nefarius/ViGEmBus) *

- [SDL 2](https://github.com/libsdl-org/SDL) // Used for gaining controller data

# Global Variables

Global Variables to use inside your Lua scripts. All default lua modules will work aswell, such as math, io, coroutine, debug, base64, package, string and table.

## g_res
Contains [controller stick resolutions](https://github.com/zKiwiko/Stick-Resolutions) from ranges -32768 to 32767.
These values are in an array and can be grabbed via: ```g_res[]``` the number in the [ ] can only be an integer from -100 to 100.

g_res is best used with [set_axis](#set_axis) to more conviently set axis values and to pull data of the axis.

```lua
set_axis(Axis, g_res[int]. -- Will set the axis to the integers stick resolution value.

if get_axis(Axis) > g_res[int] .. -- Will return true when the axis is pushed passed the g_res value.
```

If the 'int' is set to 100, itll set the axis to 32767. and vice versa with -100.

## g_FullSet
Simple variable you can use to full set an axis. Best used with Trigger Axis'. Cannot be used with buttons using [set_val](#set_val) as its a constant 32767.

```lua
set_axis(Axis, g_FullSet)
```

Will full set an axis to 32767. Alternatively you can do ```-g_FullSet``` to obtain a negative integer (-32767).

## g_UnSet
Will set an axis or button to 0.

```lua 
set_axis(Axis, g_UnSet) // Will set an Axis to 0.

set_val(Button, g_UnSet) // Will set a button to 0, as if youre not pressing it.
```

# Global Functions
Functions usable within your lua script.

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
 -RT -> Right Trigger of a Controller.Min range; -32767, Max range; 32767.

With Triggers -32767 is equal to not pressing, 32767 is equal to a full press.

An example way of using get_axis is as follows:

```lua
if get_axis("LT") >= g_res[50] then
 print("True")
end
```

This example will print "True" if the Left Trigger is bring pressed passed its halfway point.

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
set_axis("LX", 32767) -- Set the stick all the way to the Right using a manual 16 bit value.
set_axis("LY", g_res[100]) -- Set the stick all the way to the Right using g_res.
```

Valid Axis' can be seen [here](#get_axis).

Setting trigger axis' values are different from SDL, as SDL uses ranges from -32768 to 32767, while ViGEm uses ranges from 0 - 255. 0 being unpressed, 255 being full pressed.






 

