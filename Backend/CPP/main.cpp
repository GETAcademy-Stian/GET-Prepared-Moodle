#include <iostream>
#include "Encryption.h"
#include "Compression.h"
#include "Logger.h"

void showMenu() {
    std::cout << "1. Krypter fil\n";
    std::cout << "2. Dekrypter fil\n";
    std::cout << "3. Komprimer fil\n";
    std::cout << "4. Dekomprimer fil\n";
    std::cout << "5. Avslutt\n";
}

int main() {
    int choice;
    std::string password, infile, outfile;

    while (true) {
        showMenu();
        std::cin >> choice;
        switch (choice) {
            case 1:
                std::cout << "Skriv inn passord: ";
                std::cin >> password;
                std::cout << "Skriv inn filnavn (input): ";
                std::cin >> infile;
                std::cout << "Skriv inn filnavn (output): ";
                std::cin >> outfile;
                Encryption::encrypt(password, infile, outfile);
                Logger::log("Kryptering utført.");
                break;
            case 2:
                std::cout << "Skriv inn passord: ";
                std::cin >> password;
                std::cout << "Skriv inn filnavn (input): ";
                std::cin >> infile;
                std::cout << "Skriv inn filnavn (output): ";
                std::cin >> outfile;
                Encryption::decrypt(password, infile, outfile);
                Logger::log("Dekryptering utført.");
                break;
            case 3:
                std::cout << "Skriv inn filnavn (input): ";
                std::cin >> infile;
                std::cout << "Skriv inn filnavn (output): ";
                std::cin >> outfile;
                Compression::compress(infile, outfile);
                Logger::log("Komprimering utført.");
                break;
            case 4:
                std::cout << "Skriv inn filnavn (input): ";
                std::cin >> infile;
                std::cout << "Skriv inn filnavn (output): ";
                std::cin >> outfile;
                Compression::decompress(infile, outfile);
                Logger::log("Dekomprimering utført.");
                break;
            case 5:
                return 0;
            default:
                std::cout << "Ugyldig valg. Prøv igjen.\n";
        }
    }
}
