#pragma once

#include <lua.hpp>

class LState {
private:
    static lua_State* L;

public:
    static void init();
    static void clean();
    static lua_State* getState();

    LState(const LState&) = delete;
    LState& operator=(const LState&) = delete;
};