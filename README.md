# HashForge: Visual Cryptographic Suite & Hash Cracker

An interactive, responsive, client-side web application designed to demonstrate the mechanics of password security, dictionary cracking, brute-force search space analysis, and cryptographic hashing properties (such as the avalanche effect and salting).

## Features

1. **Dictionary Cracker Engine**: 
   - Non-blocking multithreaded design utilizing browser Web Workers.
   - Autodetects MD5, SHA-1, SHA-256, and SHA-512 hashes.
   - Built-in dictionaries (1k and 10k lists) or upload custom wordlists.
   - Live attempts streaming inside an integrated security HUD dashboard.
2. **Real-time Hashing & Avalanche Effect**:
   - Computes four hashing algorithms instantly on keystrokes.
   - Interactive bit comparison panel highlighting individual bit-flips between slightly different inputs.
3. **Entropy & Brute Force Simulation**:
   - Interactive password complexity estimator calculating character space, permutations, and mathematical entropy.
   - Worst-case estimation matrix under distinct attacker profiles (Consumer CPU, RTX 4090, GPU rigs, and Botnets).
   - Animated tick simulation showing the searching process.
4. **Educational Academy**:
   - Interactive playground illustrating Salting vs Rainbow tables.
   - In-depth descriptions of hash properties and real-world database storage principles.

## Getting Started

1. Set the project folder as your active workspace, or copy the files directly.
2. Double click/open the `index.html` file in any modern web browser.
3. Select any test preset (e.g., the default SHA-256 preset for the word "password") and click **Launch Dictionary Attack** to see it crack!
