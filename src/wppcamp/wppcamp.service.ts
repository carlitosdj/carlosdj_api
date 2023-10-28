import { Injectable } from '@nestjs/common';
import { CreateWppcampDto } from './dto/create-wppcamp.dto';
import { UpdateWppcampDto } from './dto/update-wppcamp.dto';
// import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class WppcampService {
  // constructor(private prismaService: PrismaService) {}

  findAll(page: number, take: number) {
    if (page == 0) page = 1;
    const skip = take * (page - 1);
    // return this.prismaService.wppCamp.findMany({
    //   skip,
    //   take,
    // });
  }

  findOne(id: number) {
    // return this.prismaService.wppCamp.findFirstOrThrow({
    //   where: { id },
    //   include: {
    //     wppgroup: true,
    //   },
    // });
  }

  async findGroupAvailable(campaign: string) {
    // //Busca campanha com o slug
    // const campaignSearch = await this.prismaService.wppCamp.findFirstOrThrow({
    //   where: {
    //     slug: campaign,
    //   },
    // });
    // console.log('Campanha', campaign);
    // //Grava o maximo de cliques
    // const maxclicks = (await campaignSearch!).maxclicks;
    // //Acha o próximo grupo que está disponível: Less than maxclicks
    // const groupavailable = await this.prismaService.wppGroup.findFirstOrThrow({
    //   where: {
    //     AND: [
    //       {
    //         clicks: {
    //           lt: maxclicks, //less than
    //         },
    //         camp_id: campaignSearch!.id,
    //       },
    //     ],
    //   },
    // });

    // //Soma cliques:
    // const clicks = (await groupavailable!).clicks + 1;
    // const id = (await groupavailable!).id;
    // //console.log('clicks', clicks);
    // //console.log('id', id);

    // //Atualiza cliques:
    // return await this.prismaService.wppGroup.update({
    //   where: { id },
    //   data: { clicks },
    // });

    // // console.log('GROUP AVAILABLE', groupavailable);
    // // return groupavailable;
  }

  create(createWppcampDto: CreateWppcampDto) {
    // return this.prismaService.wppCamp.create({
    //   data: createWppcampDto,
    // });
  }

  update(id: number, updateWppcampDto: UpdateWppcampDto) {
    // return this.prismaService.wppCamp.update({
    //   where: { id },
    //   data: updateWppcampDto,
    // });
  }

  remove(id: number) {
    // return this.prismaService.wppCamp.delete({ where: { id } });
  }
}
