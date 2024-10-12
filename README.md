# Astral
#### Disclaimer: This project is not open source. This Repository is for ease of download as well as documentation for the project.

'Astral' is a program that intergrates controller scripting/emulating into [Lua lang](https://lua.org). It made to bring controller scripting to PC without the need of purchasing a physical device.
Astral uses a variety of frameworks to bring the best performance into scripting, thus being:

- [HidHide](https://github.com/nefarius/HidHide)

- [ViGEm Client](https://github.com/nefarius/ViGEmClient)

- [ViGEm Bus Driver](https://github.com/nefarius/ViGEmBus) *

- [SDL 2](https://github.com/libsdl-org/SDL)

# Global Variables

Global Variables to use inside your Lua scripts.

## g_res
Contains [controller stick resolutions](https://github.com/zKiwiko/Stick-Resolutions) from ranges -32768 to 32767.
These values are in an array and can be grabbed via: ```g_res[]``` the number in the [ ] can only be an integer from -100 to 100.

g_res is best used with [set_axis](#set_axis) to more conviently set axis values.

```set_axis(Axis, g_res[int]```. 

If the 'int' is set to 100, itll set the axis to 32767.

## g_FullSet
Simple variable you can use to full set an axis. Best used with Trigger Axis'. Cannot be used with buttons using [set_val](#set_val) as its a constant 32767.

```set_axis(Axis, g_FullSet)```

Will full set an axis to 32767. Alternatively you can do ```-g_FullSet``` to obtain a negative integer (-32767).

## g_UnSet
Will set an axis or button to 0

 

