sieve = [True]*20

sieve[0] = False
sieve[1] = False
sieve[2] = True
sieve[3] = True
for d in range(2, int(len(sieve)**(1/2))+2):
    sieve[2 * d] = False
    if (sieve[d] == True):
        for i in range(d, len(sieve)):
            if (d * i > len(sieve) - 1): break
            # if (i + d > len(sieve) - 1): break
            sieve[d * i] = False
for i in range(len(sieve)):
    print(i, sieve[i])
