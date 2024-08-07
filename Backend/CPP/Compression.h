#ifndef COMPRESSION_H
#define COMPRESSION_H

#include <string>

class Compression {
public:
    static void compress(const std::string& infile, const std::string& outfile);
    static void decompress(const std::string& infile, const std::string& outfile);
};

#endif // COMPRESSION_H
