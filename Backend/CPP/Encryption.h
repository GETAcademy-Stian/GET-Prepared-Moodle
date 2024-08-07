#ifndef ENCRYPTION_H
#define ENCRYPTION_H

#include <string>

class Encryption {
public:
    static std::string hashPassword(const std::string& password);
    static void encrypt(const std::string& password, const std::string& infile, const std::string& outfile);
    static void decrypt(const std::string& password, const std::string& infile, const std::string& outfile);
};

#endif // ENCRYPTION_H
