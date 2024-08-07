#include <iostream>
#include <fstream>
#include <string>
#include <zlib.h>

class Compression
{
public:
    void compress(const std::string &infile, const std::string &outfile);
    void decompress(const std::string &infile, const std::string &outfile);
};

void Compression::compress(const std::string &infile, const std::string &outfile)
{
    // åpne input- og output-filer
    std::ifstream inputFile(infile, std::ios_base::in | std::ios_base::binary);
    std::ofstream outputFile(outfile, std::ios_base::out | std::ios_base::binary);

    if (!inputFile.is_open() || !outputFile.is_open())
    {
        std::cerr << "Feil ved åpning av filer." << std::endl;
        return;
    }

    // les data fra input-fil
    std::string inputData((std::istreambuf_iterator<char>(inputFile)), std::istreambuf_iterator<char>());

    // komprimer data
    uLongf compressedSize = compressBound(inputData.size());
    std::vector<Bytef> compressedData(compressedSize);

    if (compress(compressedData.data(), &compressedSize, reinterpret_cast<const Bytef *>(inputData.data()), inputData.size()) != Z_OK)
    {
        std::cerr << "Feil ved komprimering." << std::endl;
        return;
    }

    // skriv komprimert data til output-fil
    outputFile.write(reinterpret_cast<const char *>(compressedData.data()), compressedSize);
}

void Compression::decompress(const std::string &infile, const std::string &outfile)
{
    // åpne input- og output-filer
    std::ifstream inputFile(infile, std::ios_base::in | std::ios_base::binary);
    std::ofstream outputFile(outfile, std::ios_base::out | std::ios_base::binary);

    if (!inputFile.is_open() || !outputFile.is_open())
    {
        std::cerr << "Feil ved åpning av filer." << std::endl;
        return;
    }

    // les komprimert data fra input-fil
    std::string compressedData((std::istreambuf_iterator<char>(inputFile)), std::istreambuf_iterator<char>());

    // dekomprimer data
    uLongf decompressedSize = compressedData.size() * 4; // en grov approximation om størrelsen etter dekomprimering
    std::vector<Bytef> decompressedData(decompressedSize);

    if (uncompress(decompressedData.data(), &decompressedSize, reinterpret_cast<const Bytef *>(compressedData.data()), compressedData.size()) != Z_OK)
    {
        std::cerr << "Feil ved dekomprimering." << std::endl;
        return;
    }

    // skriv dekomprimert data til output-fil
    outputFile.write(reinterpret_cast<const char *>(decompressedData.data()), decompressedSize);
}
