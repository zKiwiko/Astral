cmake_minimum_required(VERSION 3.10)

project(Astral VERSION 1.0)

file(GLOB SOURCES "src/*.c" "src/*.cpp")

add_executable(${PROJECT_NAME}
    ${SOURCES}
)

target_include_directories(${PROJECT_NAME} PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/include/vigem
    "C:/Lua" # When building, change this to your Lua installation Directory. Should have all the .h and .c files needed.
)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)