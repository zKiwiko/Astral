cmake_minimum_required(VERSION 3.10)

project(Astral VERSION 1.0)

add_executable(${PROJECT_NAME}
    src/main.cpp
    src/lua_functions.cpp
    src/lua_libraries.cpp
    src/virtual.cpp
)

target_include_directories(${PROJECT_NAME} PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/include/vigem
)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)