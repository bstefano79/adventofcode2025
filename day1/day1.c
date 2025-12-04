#include <stdio.h>
#include <unistd.h>
#include <string.h>

int main() {

   FILE *fp = fopen("day1.txt", "r");
    if (!fp) {
        printf("Errore: impossibile aprire il file.\n");
        return 1;
    }
    int pos = 50;
    int count=0;
    char buffer[256];
    while (fgets(buffer, sizeof(buffer), fp)) {
       char t = buffer[0];
       int mov = atoi(memmove(buffer, buffer + 1, strlen(buffer)));

       count = count + ((int)(mov/100));


       mov=mov%100;

       if(t=='L')mov*=-1;

       int oldPos=pos;
       pos+=mov;

       //pos=pos<0?(100+pos):pos%100;
       if(pos<0){
        pos=100+pos;
        if(oldPos!=0)
            count++;
       }else if(pos>=100){
        pos=pos%100;
        count++;
       }else if(pos==0)count++;

    }
    printf("password = %d",count);

    fclose(fp);
    return 0;

}
