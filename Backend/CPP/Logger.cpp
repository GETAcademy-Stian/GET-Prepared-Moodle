#include "Logger.h"
#include <fstream>

void Logger::log(const std::string& message) {
    std::ofstream logFile("log.txt", std::ios_base::app);
    if (logFile.is_open()) {
        logFile << message << std::endl;
    }
}
