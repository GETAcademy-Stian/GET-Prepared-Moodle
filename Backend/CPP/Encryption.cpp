#include "Encryption.h"
#include <openssl/evp.h>
#include <openssl/rand.h>
#include <fstream>
#include <vector>
#include <stdexcept>
#include <cstring>

void handleErrors()
{
    ERR_print_errors_fp(stderr);
    throw std::runtime_error("OpenSSL error");
}

// kryptering
void Encryption::encrypt(const std::string &password, const std::string &infile, const std::string &outfile)
{
    const int BUFFER_SIZE = 4096;
    unsigned char key[EVP_MAX_KEY_LENGTH], iv[EVP_MAX_IV_LENGTH];

    // hash passordet til en 256-bit key
    std::string hashedPassword = hashPassword(password);
    std::memcpy(key, hashedPassword.c_str(), EVP_MAX_KEY_LENGTH);

    // generer en tilfeldig IV (Initialization Vector)
    if (!RAND_bytes(iv, sizeof(iv)))
    {
        handleErrors();
    }

    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    if (!ctx)
        handleErrors();

    if (1 != EVP_EncryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv))
        handleErrors();

    std::ifstream inputFile(infile, std::ios::binary);
    if (!inputFile.is_open())
        throw std::runtime_error("Cannot open input file");

    std::ofstream outputFile(outfile, std::ios::binary);
    if (!outputFile.is_open())
        throw std::runtime_error("Cannot open output file");

    outputFile.write(reinterpret_cast<const char *>(iv), sizeof(iv)); // skriv IV til outputfilen

    unsigned char buffer[BUFFER_SIZE];
    unsigned char ciphertext[BUFFER_SIZE + EVP_CIPHER_block_size(EVP_aes_256_cbc())];
    int len;

    while (inputFile.read(reinterpret_cast<char *>(buffer), BUFFER_SIZE))
    {
        if (1 != EVP_EncryptUpdate(ctx, ciphertext, &len, buffer, inputFile.gcount()))
            handleErrors();
        outputFile.write(reinterpret_cast<const char *>(ciphertext), len);
    }

    if (1 != EVP_EncryptFinal_ex(ctx, ciphertext + len, &len))
        handleErrors();
    outputFile.write(reinterpret_cast<const char *>(ciphertext), len);

    EVP_CIPHER_CTX_free(ctx);
}

// dekryptering
void Encryption::decrypt(const std::string &password, const std::string &infile, const std::string &outfile)
{
    const int BUFFER_SIZE = 4096;
    unsigned char key[EVP_MAX_KEY_LENGTH], iv[EVP_MAX_IV_LENGTH];

    // hash passordet til en 256-bit key
    std::string hashedPassword = hashPassword(password);
    std::memcpy(key, hashedPassword.c_str(), EVP_MAX_KEY_LENGTH);

    EVP_CIPHER_CTX *ctx = EVP_CIPHER_CTX_new();
    if (!ctx)
        handleErrors();

    std::ifstream inputFile(infile, std::ios::binary);
    if (!inputFile.is_open())
        throw std::runtime_error("Cannot open input file");

    std::ofstream outputFile(outfile, std::ios::binary);
    if (!outputFile.is_open())
        throw std::runtime_error("Cannot open output file");

    // les IV fra inputfilen
    inputFile.read(reinterpret_cast<char *>(iv), sizeof(iv));

    if (1 != EVP_DecryptInit_ex(ctx, EVP_aes_256_cbc(), NULL, key, iv))
        handleErrors();

    unsigned char buffer[BUFFER_SIZE];
    unsigned char plaintext[BUFFER_SIZE];
    int len;

    while (inputFile.read(reinterpret_cast<char *>(buffer), BUFFER_SIZE))
    {
        if (1 != EVP_DecryptUpdate(ctx, plaintext, &len, buffer, inputFile.gcount()))
            handleErrors();
        outputFile.write(reinterpret_cast<const char *>(plaintext), len);
    }

    if (1 != EVP_DecryptFinal_ex(ctx, plaintext + len, &len))
        handleErrors();
    outputFile.write(reinterpret_cast<const char *>(plaintext), len);

    EVP_CIPHER_CTX_free(ctx);
}
