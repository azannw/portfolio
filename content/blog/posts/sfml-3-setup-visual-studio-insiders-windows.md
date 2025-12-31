If you search online for SFML setup guides you will notice most of them are old or written for SFML 2 and older Visual Studio versions. When I was setting up SFML 3 with Visual Studio Community Insiders, half of the tutorials did not work. This is the exact step by step setup that worked for me on Windows and should work for you too.

This guide assumes you already installed Visual Studio Community Insiders with the Desktop Development with C++ workload. You do not need VS Code here.

## Step 1 Download the correct SFML build

Go to the official SFML website and open the Downloads page. Choose the latest stable release. For Windows download the MSVC 64 bit build. It will contain MSVC and 64bit in the file name. Download the zip file.

After it downloads, extract it somewhere permanent. Inside the extracted folder you should see include, lib and bin folders.

## Step 2 Create a clean folder structure on your PC

Pick a clean location for your project. For example

```
C:\Dev\sfml_game
```

Inside that folder create two subfolders:

```
C:\Dev\sfml_game\SFML
C:\Dev\sfml_game\Project
```

Copy everything from the extracted SFML folder (include, lib, bin etc) into the SFML folder. Your structure now looks like this:

```
C:\Dev\sfml_game\SFML\include
C:\Dev\sfml_game\SFML\lib
C:\Dev\sfml_game\SFML\bin
C:\Dev\sfml_game\Project
```

Now open Visual Studio Community Insiders and create a new C++ Empty Project. Save it inside the Project folder. Name it sfml_game. After this step you should see:

```
C:\Dev\sfml_game\Project\sfml_game.sln
```

This keeps your SFML libraries and your project separated in a clean and portable structure.

## Step 3 Configure Visual Studio to use x64

Open your project in Visual Studio. In the top toolbar you will usually see Debug and Win32. Change Win32 to x64. SFML 64 bit will not work with Win32, so selecting x64 is important.

## Step 4 Set Additional Include Directories

Right click your project in Solution Explorer and choose Properties. At the top set:

- Configuration: All Configurations
- Platform: x64

Go to

```
Configuration Properties
C/C++
General
Additional Include Directories
```

Add this line:

```
$(SolutionDir)..\SFML\include
```

Click Apply.

This tells the compiler where to find SFML headers like SFML/Graphics.hpp.

## Step 5 Set Additional Library Directories

Still in Project Properties, go to

```
Configuration Properties
Linker
General
Additional Library Directories
```

Add this line:

```
$(SolutionDir)..\SFML\lib
```

Click Apply.

This tells the linker where to find SFML library files.

## Step 6 Link SFML libraries

Go to

```
Configuration Properties
Linker
Input
Additional Dependencies
```

Open your SFML\lib folder and look at the exact filenames. SFML 3 uses names like

```
sfml-graphics-d-3.lib
sfml-window-d-3.lib
sfml-system-d-3.lib
```

For Debug builds add the ones with d in their name.
For Release builds add the ones without d.

Do not remove default Windows libraries, just add the SFML ones under them.

Click Apply.

## Step 7 Copy SFML DLLs next to the exe

Your program will build into something like

```
C:\Dev\sfml_game\Project\x64\Debug
```

and

```
C:\Dev\sfml_game\Project\x64\Release
```

Copy all the DLL files from

```
C:\Dev\sfml_game\SFML\bin
```

into the Debug folder when running Debug, and into the Release folder when running Release. If you see both debug and release DLLs in the bin folder, you can copy them all, the correct one will be used.

The important rule is that all SFML DLLs must be placed next to the compiled sfml_game.exe file, otherwise the program will crash with missing DLL errors.

## Optional Step: automatic DLL copying with a post build event

Instead of manually copying DLLs all the time, you can tell Visual Studio to copy them automatically after each build.

Go to

```
Project Properties
Build Events
Post Build Event
Command Line
```

Paste this command:

```
xcopy /Y /D "$(SolutionDir)..\SFML\bin\*.dll" "$(OutDir)"
```

Now every time you build your project, Visual Studio copies the DLLs to the correct output folder automatically.

## Step 8 Minimal SFML 3 test code

Paste this into main.cpp:

```cpp
#include <SFML/Graphics.hpp>

int main() {
    sf::RenderWindow window(sf::VideoMode({800,600}), "SFML Setup Test");

    while(window.isOpen()) {
        while(const std::optional event = window.pollEvent()) {
            if(event->is<sf::Event::Closed>())
                window.close();
        }
    }
}
```

Build and run. You should see a window that stays on screen until you close it. If the window appears for a second then disappears, it probably means the loop ran outside or the window closed instantly, so check your braces.

## Step 9 Understanding the macros

$(SolutionDir) points to the folder containing your .sln file.
Using $(SolutionDir)..\SFML\include means you are moving one folder up and then into SFML\include.

This avoids hard coded Windows paths and keeps your project portable. You could move your entire sfml_game folder anywhere and Visual Studio would still find the include and lib folders using these macros.

## Common issues and how to fix them

Cannot open include file SFML or Graphics.hpp  
Check your Additional Include Directories. The include folder must be correct.

Cannot open file sfml graphics d 3.lib  
Check Additional Library Directories and make sure you selected x64, not Win32.

Program starts but crashes with missing DLL  
Copy the SFML DLL files next to your exe or add the post build xcopy command.

If your window appears but closes instantly, check that your while(window.isOpen()) loop has everything inside it including clear, draw and display calls when you start drawing shapes.

## Final result

This setup gives you a clean structure like this:

```
C:\Dev\sfml_game\SFML
C:\Dev\sfml_game\Project
```

Your project is now ready for SFML 3. You can start drawing shapes, loading textures, playing sounds and building your game logic without touching your Visual Studio settings again.

Once this setup works, you can move directly into the 2D drawing tutorial and start experimenting with RenderWindow, clear, draw and display. Enjoy building your game.

