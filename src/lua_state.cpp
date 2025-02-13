#include <lua_state.h>

lua_State* LState::L = nullptr;

void LState::init() {
    if(!L) {
        L = luaL_newstate();
        luaL_openlibs(L);
    }
}

void LState::clean() {
    if(L) {
        lua_close(L);
        L = nullptr;
    }
}

lua_State* LState::getState() {
    return L;
}